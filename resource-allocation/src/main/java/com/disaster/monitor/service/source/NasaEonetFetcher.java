package com.disaster.monitor.service.source;

import com.disaster.monitor.dto.DisasterEventDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Instant;
import java.util.*;

/**
 * Fetches natural event data from NASA Earth Observatory Natural Event Tracker (EONET).
 * API: https://eonet.gsfc.nasa.gov/docs/v3
 * Free, no API key required.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NasaEonetFetcher {

    private final WebClient webClient;

    @Value("${disaster.api.eonet.url}")
    private String eonetUrl;

    @Value("${disaster.api.eonet.lookback-days:7}")
    private int lookbackDays;

    private static final Map<String, String> CATEGORY_MAP = Map.ofEntries(
        Map.entry("drought",        "drought"),
        Map.entry("dustHaze",       "dust_haze"),
        Map.entry("earthquakes",    "earthquake"),
        Map.entry("floods",         "flood"),
        Map.entry("landslides",     "landslide"),
        Map.entry("manmade",        "manmade"),
        Map.entry("seaLakeIce",     "ice_event"),
        Map.entry("severeStorms",   "storm"),
        Map.entry("snow",           "snow"),
        Map.entry("tempExtremes",   "extreme_temperature"),
        Map.entry("volcanoes",      "volcano"),
        Map.entry("wildfires",      "wildfire")
    );

    private static final Set<String> HIGH_SEVERITY   = Set.of("wildfire","flood","volcano","storm","tsunami");
    private static final Set<String> MEDIUM_SEVERITY = Set.of("earthquake","landslide","extreme_temperature","drought");

    @SuppressWarnings("unchecked")
    public List<DisasterEventDto> fetch() {
        log.info("[EONET] Fetching open events for last {} days", lookbackDays);

        try {
            Map<String, Object> response = webClient.get()
                .uri(eonetUrl, uri -> uri
                    .queryParam("status", "open")
                    .queryParam("days",   lookbackDays)
                    .queryParam("limit",  300)
                    .build())
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            if (response == null) return Collections.emptyList();

            List<Map<String, Object>> events =
                (List<Map<String, Object>>) response.get("events");

            if (events == null) return Collections.emptyList();

            List<DisasterEventDto> result = new ArrayList<>();
            for (Map<String, Object> event : events) {
                try {
                    result.add(mapEvent(event));
                } catch (Exception e) {
                    log.warn("[EONET] Skipping event: {}", e.getMessage());
                }
            }

            log.info("[EONET] Fetched {} events", result.size());
            return result;

        } catch (Exception e) {
            log.error("[EONET] Fetch failed: {}", e.getMessage());
            throw new RuntimeException("NASA EONET fetch failed: " + e.getMessage(), e);
        }
    }

    @SuppressWarnings("unchecked")
    private DisasterEventDto mapEvent(Map<String, Object> event) {
        String id    = (String) event.get("id");
        String title = (String) event.getOrDefault("title", "Unknown Event");

        // Resolve disaster type from first category
        List<Map<String, Object>> categories =
            (List<Map<String, Object>>) event.getOrDefault("categories", Collections.emptyList());
        String categoryId    = categories.isEmpty() ? "" : (String) categories.get(0).get("id");
        String disasterType  = CATEGORY_MAP.getOrDefault(categoryId, categoryId.toLowerCase());

        // Extract latest geometry coordinates
        List<Map<String, Object>> geometries =
            (List<Map<String, Object>>) event.getOrDefault("geometry", Collections.emptyList());

        Double lat = null, lon = null;
        Instant startedAt = Instant.now();

        if (!geometries.isEmpty()) {
            Map<String, Object> geo = geometries.get(geometries.size() - 1);
            List<Number> coords     = extractCoords(geo);
            if (coords != null && coords.size() >= 2) {
                lon = coords.get(0).doubleValue();
                lat = coords.get(1).doubleValue();
            }
            String dateStr = (String) geometries.get(0).get("date");
            if (dateStr != null) startedAt = Instant.parse(dateStr);
        }

        // Sources
        List<Map<String, Object>> sources =
            (List<Map<String, Object>>) event.getOrDefault("sources", Collections.emptyList());
        String externalUrl = sources.isEmpty() ? null : (String) sources.get(0).get("url");

        String closed = (String) event.get("closed");

        return DisasterEventDto.builder()
            .eventId(     "EONET_" + id)
            .source(      "NASA_EONET")
            .disasterType(disasterType)
            .title(       title)
            .description( String.format("%s event tracked by NASA EONET. Category: %s.",
                              title, categoryId))
            .severity(    toSeverity(disasterType))
            .magnitude(   null)
            .latitude(    lat)
            .longitude(   lon)
            .locationName(title)
            .country(     null)
            .status(      closed != null ? "resolved" : "active")
            .startedAt(   startedAt)
            .endedAt(     closed != null ? Instant.parse(closed) : null)
            .externalUrl( externalUrl)
            .rawData(     event)
            .build();
    }

    @SuppressWarnings("unchecked")
    private List<Number> extractCoords(Map<String, Object> geo) {
        Object type   = geo.get("type");
        Object coords = geo.get("coordinates");
        if (coords == null) return null;

        if ("Point".equals(type)) {
            return (List<Number>) coords;
        }
        if ("Polygon".equals(type)) {
            // Return first vertex of outer ring as approximate centre
            List<List<List<Number>>> rings = (List<List<List<Number>>>) coords;
            if (!rings.isEmpty() && !rings.get(0).isEmpty()) {
                return rings.get(0).get(0);
            }
        }
        return null;
    }

    private String toSeverity(String type) {
        if (HIGH_SEVERITY.contains(type))   return "high";
        if (MEDIUM_SEVERITY.contains(type)) return "medium";
        return "low";
    }
}