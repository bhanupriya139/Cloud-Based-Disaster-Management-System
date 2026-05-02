package com.disaster.resource_allocation.repository;

import com.disaster.resource_allocation.model.RegionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface RegionHistoryRepository extends JpaRepository<RegionHistory, UUID> {

}