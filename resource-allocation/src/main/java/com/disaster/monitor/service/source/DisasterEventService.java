package com.disaster.monitor.service.source;

import com.disaster.monitor.dto.DisasterEventDto;
import com.disaster.monitor.entity.ApiPollLog;
import com.disaster.monitor.entity.DisasterEvent;
import com.disaster.monitor.repository.ApiPollLogRepository;
import com.disaster.monitor.repository.DisasterEventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class DisasterEventService {

    private final DisasterEventRepository eventRepo;
    private final ApiPollLogRepository    pollLogRepo;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${kafka.topic.disaster-events}")
    private String disasterEventsTopic;

    @Value("${kafka.topic.disaster-alerts}")
    private String disasterAlertsTopic;

    // ─── Upsert a batch of events ─────────────────────────────────────────────

    @Transactional
    public PollResult saveAll(String source, List<DisasterEventDto> dtos) {
        int inserted = 0, updated = 0, skipped = 0;

        for (DisasterEventDto dto : dtos) {
            try {
                SaveResult r = upsert(dto);
                switch (r) {
                    case INSERTED -> inserted++;
                    case UPDATED  -> updated++;
                    case SKIPPED  -> skipped++;
                }
            } catch (Exception e) {
                log.warn("[Service] Failed to save event {}: {}", dto.getEventId(), e.getMessage());
                skipped++;
            }
        }

        log.info("[Service] {} → inserted={} updated={} skipped={}",
            source, inserted, updated, skipped);
        return new PollResult(inserted, updated, skipped);
    }

    private SaveResult upsert(DisasterEventDto dto) {
        Optional<DisasterEvent> existing = eventRepo.findByEventId(dto.getEventId());

        if (existing.isEmpty()) {
            DisasterEvent entity = toEntity(dto);
            eventRepo.save(entity);
            publishToKafka(dto, "new_event");
            return SaveResult.INSERTED;
        }

        DisasterEvent entity = existing.get();
        boolean changed = false;

        // Only update if meaningful fields changed
        if (!Objects.equals(entity.getSeverity(), dto.getSeverity())) {
            entity.setSeverity(dto.getSeverity());
            changed = true;
            // Severity escalation → alert
            publishAlert(dto, "severity_escalated");
        }
        if (!Objects.equals(entity.getStatus(), dto.getStatus())) {
            entity.setStatus(dto.getStatus());
            changed = true;
            if ("resolved".equals(dto.getStatus())) publishAlert(dto, "resolved");
        }
        if (dto.getMagnitude() != null &&
            !Objects.equals(entity.getMagnitude(), dto.getMagnitude())) {
            entity.setMagnitude(dto.getMagnitude());
            changed = true;
        }
        if (dto.getEndedAt() != null) {
            entity.setEndedAt(dto.getEndedAt());
            changed = true;
        }

        entity.setRawData(dto.getRawData());

        if (changed) {
            eventRepo.save(entity);
            return SaveResult.UPDATED;
        }

        // Still refresh the fetch timestamp
        entity.setFetchedAt(Instant.now());
        eventRepo.save(entity);
        return SaveResult.SKIPPED;
    }

    // ─── Kafka publishing ─────────────────────────────────────────────────────

    private void publishToKafka(DisasterEventDto dto, String eventType) {
        try {
            Map<String, Object> msg = new HashMap<>();
            msg.put("eventType",    eventType);
            msg.put("eventId",      dto.getEventId());
            msg.put("source",       dto.getSource());
            msg.put("disasterType", dto.getDisasterType());
            msg.put("severity",     dto.getSeverity());
            msg.put("title",        dto.getTitle());
            msg.put("latitude",     dto.getLatitude());
            msg.put("longitude",    dto.getLongitude());
            msg.put("locationName", dto.getLocationName());
            msg.put("startedAt",    dto.getStartedAt() != null ? dto.getStartedAt().toString() : null);
            msg.put("timestamp",    Instant.now().toString());

            kafkaTemplate.send(disasterEventsTopic, dto.getEventId(), msg);
        } catch (Exception e) {
            log.warn("[Kafka] Failed to publish event {}: {}", dto.getEventId(), e.getMessage());
        }
    }

    private void publishAlert(DisasterEventDto dto, String alertType) {
        try {
            Map<String, Object> alert = new HashMap<>();
            alert.put("alertType",    alertType);
            alert.put("eventId",      dto.getEventId());
            alert.put("disasterType", dto.getDisasterType());
            alert.put("severity",     dto.getSeverity());
            alert.put("title",        dto.getTitle());
            alert.put("locationName", dto.getLocationName());
            alert.put("timestamp",    Instant.now().toString());

            kafkaTemplate.send(disasterAlertsTopic, dto.getEventId(), alert);
        } catch (Exception e) {
            log.warn("[Kafka] Failed to publish alert {}: {}", dto.getEventId(), e.getMessage());
        }
    }

    // ─── Poll log ─────────────────────────────────────────────────────────────

    public void savePollLog(String source, String status, PollResult result,
                            String errorMsg, long durationMs) {
        ApiPollLog pollLog = ApiPollLog.builder()
            .source(        source)
            .status(        status)
            .recordsFetched(result != null ? result.fetched()  : 0)
            .recordsNew(    result != null ? result.inserted() : 0)
            .recordsUpdated(result != null ? result.updated()  : 0)
            .errorMessage(  errorMsg)
            .durationMs(    (int) durationMs)
            .polledAt(      Instant.now())
            .build();
        pollLogRepo.save(pollLog);
    }

    // ─── Query methods ────────────────────────────────────────────────────────

    public Page<DisasterEvent> getEvents(String type, String severity,
                                          String source, String status,
                                          int page, int size) {
        return eventRepo.findWithFilters(type, severity, source, status,
            PageRequest.of(page, size));
    }

    public Optional<DisasterEvent> getByEventId(String eventId) {
        return eventRepo.findByEventId(eventId);
    }

    public List<DisasterEvent> getActiveCritical() {
        return eventRepo.findByStatusAndSeverityInOrderByStartedAtDesc(
            "active", List.of("high", "critical")
        );
    }

    public List<Map<String, Object>> getStats() {
        Instant since24h = Instant.now().minus(24, ChronoUnit.HOURS);
        List<Object[]> rows = eventRepo.getStatsByType(since24h);

        List<Map<String, Object>> stats = new ArrayList<>();
        for (Object[] row : rows) {
            Map<String, Object> stat = new LinkedHashMap<>();
            stat.put("type",          row[0]);
            stat.put("total",         row[1]);
            stat.put("activeCount",   row[2]);
            stat.put("criticalCount", row[3]);
            stat.put("last24h",       row[4]);
            stats.add(stat);
        }
        return stats;
    }

    public List<ApiPollLog> getPollHistory(int limit) {
        return pollLogRepo.findAllByOrderByPolledAtDesc(PageRequest.of(0, limit));
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private DisasterEvent toEntity(DisasterEventDto dto) {
        return DisasterEvent.builder()
            .eventId(     dto.getEventId())
            .source(      dto.getSource())
            .disasterType(dto.getDisasterType())
            .title(       dto.getTitle())
            .description( dto.getDescription())
            .severity(    dto.getSeverity())
            .magnitude(   dto.getMagnitude())
            .latitude(    dto.getLatitude())
            .longitude(   dto.getLongitude())
            .locationName(dto.getLocationName())
            .country(     dto.getCountry())
            .status(      dto.getStatus() != null ? dto.getStatus() : "active")
            .startedAt(   dto.getStartedAt())
            .endedAt(     dto.getEndedAt())
            .externalUrl( dto.getExternalUrl())
            .rawData(     dto.getRawData())
            .build();
    }

    // ─── Inner types ──────────────────────────────────────────────────────────

    public enum SaveResult { INSERTED, UPDATED, SKIPPED }

    public record PollResult(int inserted, int updated, int skipped) {
        public int fetched() { return inserted + updated + skipped; }
    }
}