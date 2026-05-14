package com.disaster.monitor.service.source;

import com.disaster.monitor.dto.DisasterEventDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

/**
 * Fetches real-time earthquake data from the USGS Earthquake Hazards Program.
 * API: https://earthquake.usgs.gov/fdsnws/event/1/
 * Free, no API key required.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UsgsEarthquakeFetcher {

    private final WebClient webClient;

    @Value("${disaster.api.usgs.url}")
    private String usgsUrl;

    @Value("${disaster.api.usgs.lookback-hours:24}")
    private int lookbackHours;

    @Value("${disaster.api.usgs.min-magnitude:2.5}")
    private double minMagnitude;

    @SuppressWarnings("unchecked")
    public List<DisasterEventDto> fetch() {
        Instant endTime   = Instant.now();
        Instant startTime = endTime.minus(lookbackHours, ChronoUnit.HOURS);

        log.info("[USGS] Fetching earthquakes >= M{} for last {}h", minMagnitude, lookbackHours);

        try {
            Map<String, Object> response = webClient.get()
                .uri(usgsUrl, uri -> uri
                    .queryParam("format",       "geojson")
                    .queryParam("starttime",    startTime.toString())
                    .queryParam("endtime",      endTime.toString())
                    .queryParam("minmagnitude", minMagnitude)
                    .queryParam("orderby",      "time")
                    .queryParam("limit",        500)
                    .build())
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            if (response == null) return Collections.emptyList();

            List<Map<String, Object>> features =
                (List<Map<String, Object>>) response.get("features");

            if (features == null) return Collections.emptyList();

            List<DisasterEventDto> result = new ArrayList<>();
            for (Map<String, Object> feature : features) {
                try {
                    result.add(mapFeature(feature));
                } catch (Exception e) {
                    log.warn("[USGS] Skipping malformed feature: {}", e.getMessage());
                }
            }

            log.info("[USGS] Fetched {} earthquake events", result.size());
            return result;

        } catch (Exception e) {
            log.error("[USGS] Fetch failed: {}", e.getMessage());
            throw new RuntimeException("USGS fetch failed: " + e.getMessage(), e);
        }
    }

    @SuppressWarnings("unchecked")
    private DisasterEventDto mapFeature(Map<String, Object> feature) {
        String id = (String) feature.get("id");
        Map<String, Object> props = (Map<String, Object>) feature.get("properties");
        Map<String, Object> geometry = (Map<String, Object>) feature.get("geometry");
        List<Number> coords = (List<Number>) geometry.get("coordinates");

        double lon = coords.get(0).doubleValue();
        double lat = coords.get(1).doubleValue();

        Number magNum = (Number) props.get("mag");
        double mag    = magNum != null ? magNum.doubleValue() : 0.0;
        Number timeMs = (Number) props.get("time");

        return DisasterEventDto.builder()
            .eventId(     "USGS_" + id)
            .source(      "USGS")
            .disasterType("earthquake")
            .title(       (String) props.getOrDefault("title", "Earthquake M" + mag))
            .description( buildDescription(props, mag))
            .severity(    toSeverity(mag))
            .magnitude(   BigDecimal.valueOf(mag))
            .latitude(    lat)
            .longitude(   lon)
            .locationName((String) props.getOrDefault("place", "Unknown"))
            .country(     null)
            .status(      "reviewed".equals(props.get("status")) ? "active" : "monitoring")
            .startedAt(   timeMs != null ? Instant.ofEpochMilli(timeMs.longValue()) : Instant.now())
            .endedAt(     null)
            .externalUrl( (String) props.get("url"))
            .rawData(     feature)
            .build();
    }

    private String buildDescription(Map<String, Object> props, double mag) {
        Object felt = props.get("felt");
        Object cdi  = props.get("cdi");
        return String.format(
            "Magnitude %.1f earthquake. Felt reports: %s. Max intensity (CDI): %s.",
            mag,
            felt != null ? felt : "0",
            cdi  != null ? cdi  : "N/A"
        );
    }

    private String toSeverity(double mag) {
        if (mag < 2.5) return "low";
        if (mag < 5.0) return "medium";
        if (mag < 7.0) return "high";
        return "critical";
    }
}