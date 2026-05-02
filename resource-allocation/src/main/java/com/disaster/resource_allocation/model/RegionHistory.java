package com.disaster.resource_allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "region_history")
public class RegionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String regionName;

    @Column(nullable = false)
    private String district;

    @Column(nullable = false)
    private String state;

    // Links to past disaster in this region
    @ManyToOne
    @JoinColumn(name = "disaster_id")
    private Disaster disaster;

    @Column(nullable = false)
    private String disasterType;  // flood, earthquake etc

    @Column(nullable = false)
    private String severityLevel;  // LOW, MEDIUM, HIGH, CRITICAL

    private Integer livesAffected;

    private Integer resourcesUsed;

    private String weatherCondition;  // from NASA/OpenWeather

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt;

    @PrePersist
    protected void onCreate() {
        recordedAt = LocalDateTime.now();
    }
}