package com.disaster.resource_allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "disasters")
public class Disaster {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;  // earthquake, flood, fire etc.

    @Column(nullable = false)
    private String severity;  // LOW, MEDIUM, HIGH, CRITICAL

    private Double latitude;
    private Double longitude;

    @Column(nullable = false)
    private String status;  // ACTIVE, RESOLVED, MONITORING

    @Column(name = "started_at")
    private LocalDateTime startedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}