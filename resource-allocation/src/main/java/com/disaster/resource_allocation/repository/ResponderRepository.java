package com.disaster.resource_allocation.repository;

import com.disaster.resource_allocation.model.Responder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface ResponderRepository extends JpaRepository<Responder, UUID> {
    List<Responder> findByAvailability(String availability);
    List<Responder> findByRole(String role);
}