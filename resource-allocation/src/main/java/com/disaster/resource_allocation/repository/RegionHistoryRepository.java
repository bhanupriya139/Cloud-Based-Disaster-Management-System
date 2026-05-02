package com.disaster.resource_allocation.repository;

import com.disaster.resource_allocation.model.RegionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface RegionHistoryRepository extends JpaRepository<RegionHistory, UUID> {

    // Find all history by region name
    List<RegionHistory> findByRegionName(String regionName);

    // Find all history by disaster type
    List<RegionHistory> findByDisasterType(String disasterType);

    // Find all history by state
    List<RegionHistory> findByState(String state);

    // Find all history by severity
    List<RegionHistory> findBySeverityLevel(String severityLevel);
}