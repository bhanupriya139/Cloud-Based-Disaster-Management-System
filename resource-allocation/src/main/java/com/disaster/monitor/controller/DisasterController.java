package com.disaster.monitor.controller;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.disaster.monitor.dto.ApiResponse;
import com.disaster.monitor.entity.ApiPollLog;
import com.disaster.monitor.entity.DisasterEvent;
import com.disaster.monitor.scheduler.DisasterMonitoringScheduler;
import com.disaster.monitor.service.source.DisasterEventService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * REST API for querying real-time disaster event data.
 *
 * Base path: /api/disasters
 */
@Slf4j
@RestController
@RequestMapping("/api/disasters")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DisasterController {

    private final DisasterEventService          eventService;
    private final DisasterMonitoringScheduler   scheduler;

    // ── GET /api/disasters ─────────────────────────────────────────────────────
    // List events with optional filters + pagination
    //
    // Query params:
    //   type      - earthquake | wildfire | flood | volcano | storm ...
    //   severity  - low | medium | high | critical
    //   source    - USGS | NASA_EONET | GDACS
    //   status    - active | resolved | monitoring
    //   page      - default 0
    //   size      - default 20, max 100
    @GetMapping
    public ResponseEntity<ApiResponse<Page<DisasterEvent>>> getEvents(
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String severity,
        @RequestParam(required = false) String source,
        @RequestParam(required = false) String status,
        @RequestParam(defaultValue = "0")  int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        int safeSize = Math.min(size, 100);
        Page<DisasterEvent> events = eventService.getEvents(type, severity, source, status, page, safeSize);
        return ResponseEntity.ok(ApiResponse.ok(events));
    }

    // ── GET /api/disasters/active ──────────────────────────────────────────────
    // All currently active high/critical severity events (for dashboard widgets)
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<DisasterEvent>>> getActiveCritical() {
        List<DisasterEvent> events = eventService.getActiveCritical();
        return ResponseEntity.ok(ApiResponse.ok(
            String.format("Found %d active high/critical events", events.size()), events));
    }

    // ── GET /api/disasters/stats ───────────────────────────────────────────────
    // Aggregate counts by disaster type
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStats() {
        List<Map<String, Object>> stats = eventService.getStats();
        return ResponseEntity.ok(ApiResponse.ok(stats));
    }

    // ── GET /api/disasters/poll-history ───────────────────────────────────────
    // Recent API polling attempts and their outcomes
    @GetMapping("/poll-history")
    public ResponseEntity<ApiResponse<List<ApiPollLog>>> getPollHistory(
        @RequestParam(defaultValue = "20") int limit
    ) {
        List<ApiPollLog> history = eventService.getPollHistory(Math.min(limit, 100));
        return ResponseEntity.ok(ApiResponse.ok(history));
    }

    // ── GET /api/disasters/{eventId} ───────────────────────────────────────────
    // Full detail for a single event (includes raw_data JSON)
    @GetMapping("/{eventId}")
    public ResponseEntity<ApiResponse<DisasterEvent>> getByEventId(
        @PathVariable String eventId
    ) {
        return eventService.getByEventId(eventId)
            .map(e -> ResponseEntity.ok(ApiResponse.ok(e)))
            .orElseGet(() -> ResponseEntity.status(404)
                .body(ApiResponse.error("Event not found: " + eventId)));
    }

    // ── POST /api/disasters/refresh ────────────────────────────────────────────
    // Manually trigger a full poll cycle (protect with security in production)
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<String>> triggerRefresh() {
        log.info("[Controller] Manual refresh triggered via API");
        // Run async so the response returns immediately
        new Thread(scheduler::pollAll).start();
        return ResponseEntity.ok(ApiResponse.ok(
            "Polling cycle started. Check /api/disasters/poll-history for results.",
            "triggered"));
    }
}