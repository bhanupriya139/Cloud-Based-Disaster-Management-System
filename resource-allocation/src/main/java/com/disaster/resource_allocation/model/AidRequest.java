package com.disaster.resource_allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "aid_requests")
public class AidRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "disaster_id", nullable = false)
    private Disaster disaster;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private user user;

    @Column(nullable = false)
    private String type;  // FOOD, MEDICAL, SHELTER, RESCUE

    @Column(name = "priority_score", nullable = false)
    private Integer priorityScore;  // 1-10, higher = more urgent

    @Column(nullable = false)
    private String status;  // PENDING, IN_PROGRESS, FULFILLED, REJECTED

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}