package com.disaster.resource_allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Data
@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;  // MEDICAL, FOOD, SHELTER, VEHICLE, EQUIPMENT

    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String status;  // AVAILABLE, IN_USE, DEPLETED
}