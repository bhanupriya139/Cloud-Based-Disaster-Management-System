package com.disaster.monitor.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Persisted record for a single disaster event fetched from an external API.
 */
@Entity
@Table(
    name = "disaster_events",
    indexes = {
        @Index(name = "idx_evt_type",     columnList = "disasterType"),
        @Index(name = "idx_evt_source",   columnList = "source"),
        @Index(name = "idx_evt_severity", columnList = "severity"),
        @Index(name = "idx_evt_started",  columnList = "startedAt"),
        @Index(name = "idx_evt_status",   columnList = "status"),
    }
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DisasterEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Deduplication key — composed from source + external ID (e.g. "USGS_us7000m123") */
    @Column(nullable = false, unique = true, length = 120)
    private String eventId;

    /** Data provider: USGS | NASA_EONET | GDACS */
    @Column(nullable = false, length = 50)
    private String source;

    /** Normalised type: earthquake | wildfire | flood | volcano | storm | tsunami ... */
    @Column(nullable = false, length = 60)
    private String disasterType;

    @Column(length = 300)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    /** low | medium | high | critical */
    @Column(length = 20)
    private String severity;

    /** Richter magnitude (earthquakes) or equivalent numeric scale */
    @Column(precision = 5, scale = 2)
    private BigDecimal magnitude;

    private Double latitude;
    private Double longitude;

    @Column(length = 255)
    private String locationName;

    @Column(length = 100)
    private String country;

    /** active | resolved | monitoring */
    @Column(length = 30)
    @Builder.Default
    private String status = "active";

    private Instant startedAt;
    private Instant endedAt;

    @Column(columnDefinition = "TEXT")
    private String externalUrl;

    /** Full raw API response stored as JSONB for auditability */
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> rawData;

    private Instant fetchedAt;

    @Column(updatable = false)
    private Instant createdAt;

    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
        fetchedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
        fetchedAt = Instant.now();
    }
}