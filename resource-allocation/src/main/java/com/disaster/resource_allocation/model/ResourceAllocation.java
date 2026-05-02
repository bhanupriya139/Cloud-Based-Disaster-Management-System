package com.disaster.resource_allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "resource_allocations")
public class ResourceAllocation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "disaster_id", nullable = false)
    private Disaster disaster;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private AidRequest aidRequest;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @ManyToOne
    @JoinColumn(name = "responder_id", nullable = false)
    private Responder responder;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String status;  // ALLOCATED, DISPATCHED, DELIVERED

    @Column(name = "allocated_at")
    private LocalDateTime allocatedAt;

    @PrePersist
    protected void onCreate() {
        allocatedAt = LocalDateTime.now();
    }
}