package com.disaster.resource_allocation.repository;

import com.disaster.resource_allocation.model.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface DisasterRepository extends JpaRepository<Disaster, UUID> {
    List<Disaster> findByStatus(String status);
    List<Disaster> findByType(String type);
    List<Disaster> findBySeverity(String severity);
}