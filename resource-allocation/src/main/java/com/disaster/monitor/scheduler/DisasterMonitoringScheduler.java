package com.disaster.monitor.scheduler;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.disaster.monitor.dto.DisasterEventDto;
import com.disaster.monitor.service.source.DisasterEventService;
import com.disaster.monitor.service.source.DisasterEventService.PollResult;
import com.disaster.monitor.service.source.GdacsFetcher;
import com.disaster.monitor.service.source.NasaEonetFetcher;
import com.disaster.monitor.service.source.UsgsEarthquakeFetcher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Polls all three external disaster APIs on a fixed schedule and persists results.
 * Schedule is configurable via application.properties (disaster.polling.cron).
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DisasterMonitoringScheduler {

    private final UsgsEarthquakeFetcher usgsEarthquakeFetcher;
    private final NasaEonetFetcher      nasaEonetFetcher;
    private final GdacsFetcher          gdacsFetcher;
    private final DisasterEventService  eventService;

    /**
     * Main polling cycle — runs every 5 minutes by default.
     * Also runs once on startup (initialDelay = 0 if no delay set).
     */
    @Scheduled(cron = "${disaster.polling.cron:0 */5 * * * *}")
    public void pollAll() {
        log.info("\n========== Disaster Monitoring Poll Cycle Started ==========");

        pollSource("USGS",       () -> usgsEarthquakeFetcher.fetch());
        pollSource("NASA_EONET", () -> nasaEonetFetcher.fetch());
        pollSource("GDACS",      () -> gdacsFetcher.fetch());

        log.info("========== Poll Cycle Complete ==========\n");
    }

    /**
     * Extended USGS historical refresh — runs once per hour, looks back 48h.
     * Catches events that may have been missed or updated.
     */
    @Scheduled(cron = "0 0 * * * *")
    public void pollUsgsExtended() {
        log.info("[Scheduler] Running USGS extended historical refresh");
        pollSource("USGS_EXTENDED", () -> usgsEarthquakeFetcher.fetch());
    }

    // ─── Internal helper ──────────────────────────────────────────────────────

    private void pollSource(String sourceName, FetchSupplier fetchFn) {
        long start = System.currentTimeMillis();
        try {
            List<DisasterEventDto> events = fetchFn.get();
            PollResult result = eventService.saveAll(sourceName, events);
            long duration = System.currentTimeMillis() - start;

            log.info("[Scheduler] {} ✓  fetched={} new={} updated={} skipped={} ({}ms)",
                sourceName, result.fetched(), result.inserted(),
                result.updated(), result.skipped(), duration);

            eventService.savePollLog(sourceName, "success", result, null, duration);

        } catch (Exception e) {
            long duration = System.currentTimeMillis() - start;
            log.error("[Scheduler] {} ✗  Error: {} ({}ms)", sourceName, e.getMessage(), duration);
            eventService.savePollLog(sourceName, "error",
                new PollResult(0, 0, 0), e.getMessage(), duration);
        }
    }

    @FunctionalInterface
    interface FetchSupplier {
        List<DisasterEventDto> get() throws Exception;
    }
}