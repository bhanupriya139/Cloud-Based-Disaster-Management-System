package com.disaster.monitor.entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Audit log for every external API polling attempt.
 */
@Entity
@Table(name = "api_poll_log",
       indexes = @Index(name = "idx_poll_source", columnList = "source, polledAt"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ApiPollLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String source;

    /** success | error */
    @Column(nullable = false, length = 20)
    private String status;

    @Builder.Default private int recordsFetched = 0;
    @Builder.Default private int recordsNew     = 0;
    @Builder.Default private int recordsUpdated = 0;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    private Integer durationMs;

    @Builder.Default
    private Instant polledAt = Instant.now();
}