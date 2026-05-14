package com.disaster.monitor.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.disaster.monitor.entity.DisasterEvent;

@Repository
public interface DisasterEventRepository extends JpaRepository<DisasterEvent, Long> {

    Optional<DisasterEvent> findByEventId(String eventId);

    boolean existsByEventId(String eventId);

    // ── Filtered queries ──────────────────────────────────────────────────────

    Page<DisasterEvent> findByDisasterTypeOrderByStartedAtDesc(String disasterType, Pageable pageable);

    Page<DisasterEvent> findBySeverityOrderByStartedAtDesc(String severity, Pageable pageable);

    Page<DisasterEvent> findByStatusOrderByStartedAtDesc(String status, Pageable pageable);

    @Query("SELECT e FROM DisasterEvent e " +
           "WHERE (:type     IS NULL OR e.disasterType = :type) " +
           "  AND (:severity IS NULL OR e.severity     = :severity) " +
           "  AND (:source   IS NULL OR e.source       = :source) " +
           "  AND (:status   IS NULL OR e.status       = :status) " +
           "ORDER BY e.startedAt DESC")
    Page<DisasterEvent> findWithFilters(
        @Param("type")     String type,
        @Param("severity") String severity,
        @Param("source")   String source,
        @Param("status")   String status,
        Pageable pageable
    );

    // ── Critical / active events ──────────────────────────────────────────────

    List<DisasterEvent> findByStatusAndSeverityInOrderByStartedAtDesc(
        String status, List<String> severities
    );

    // ── Stats queries ─────────────────────────────────────────────────────────

    @Query("""
        SELECT e.disasterType      AS type,
               COUNT(e)            AS total,
               SUM(CASE WHEN e.status   = 'active'   THEN 1 ELSE 0 END) AS activeCount,
               SUM(CASE WHEN e.severity = 'critical' THEN 1 ELSE 0 END) AS criticalCount,
               SUM(CASE WHEN e.startedAt > :since     THEN 1 ELSE 0 END) AS last24h
        FROM DisasterEvent e
        GROUP BY e.disasterType
        ORDER BY COUNT(e) DESC
    """)
    List<Object[]> getStatsByType(@Param("since") Instant since);

    // ── Recent events by source ───────────────────────────────────────────────

    List<DisasterEvent> findTop20BySourceOrderByStartedAtDesc(String source);
}