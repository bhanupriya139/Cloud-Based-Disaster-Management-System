package com.disaster.resource_allocation.repository;

import com.disaster.resource_allocation.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<user, UUID> {
    List<user> findByRole(String role);
    user findByEmail(String email);
    user findByPhone(String phone);
}