package com.disaster.monitor.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Intermediate DTO used by all source fetchers before persisting.
 * Each API adapter converts its raw response into this common shape.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DisasterEventDto {

    private String eventId;         // e.g. "USGS_us7000m123"
    private String source;          // USGS | NASA_EONET | GDACS
    private String disasterType;    // earthquake | wildfire | flood | ...
    private String title;
    private String description;
    private String severity;        // low | medium | high | critical
    private BigDecimal magnitude;
    private Double latitude;
    private Double longitude;
    private String locationName;
    private String country;
    private String status;          // active | resolved | monitoring
    private Instant startedAt;
    private Instant endedAt;
    private String externalUrl;
    private Map<String, Object> rawData;
}