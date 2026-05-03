package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.ResourceAllocation;
import com.disaster.resource_allocation.repository.ResourceAllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResourceAllocationService {

    @Autowired
    private ResourceAllocationRepository resourceAllocationRepository;

    public ResourceAllocation createAllocation(ResourceAllocation allocation) {
        return resourceAllocationRepository.save(allocation);
    }

    public List<ResourceAllocation> getAllAllocations() {
        return resourceAllocationRepository.findAll();
    }

    public Optional<ResourceAllocation> getAllocationById(UUID id) {
        return resourceAllocationRepository.findById(id);
    }

    public List<ResourceAllocation> getAllocationsByStatus(String status) {
        return resourceAllocationRepository.findByStatus(status);
    }

    public ResourceAllocation updateAllocation(UUID id, ResourceAllocation allocation) {
        allocation.setId(id);
        return resourceAllocationRepository.save(allocation);
    }

    public void deleteAllocation(UUID id) {
        resourceAllocationRepository.deleteById(id);
    }
}