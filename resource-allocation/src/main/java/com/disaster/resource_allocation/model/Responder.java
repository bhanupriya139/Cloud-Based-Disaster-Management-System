package com.disaster.resource_allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Data
@Entity
@Table(name = "responders")
public class Responder {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String role;  // FIREFIGHTER, MEDIC, RESCUE, POLICE

    @Column(nullable = false)
    private String organization;

    @Column(nullable = false)
    private String availability;  // AVAILABLE, BUSY, OFF_DUTY

    private Double latitude;
    private Double longitude;
}