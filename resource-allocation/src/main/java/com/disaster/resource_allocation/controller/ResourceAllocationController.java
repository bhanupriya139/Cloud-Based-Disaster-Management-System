package com.disaster.resource_allocation.controller;

import com.disaster.resource_allocation.model.ResourceAllocation;
import com.disaster.resource_allocation.service.ResourceAllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/allocations")
public class ResourceAllocationController {

    @Autowired
    private ResourceAllocationService resourceAllocationService;

    @PostMapping
    public ResponseEntity<ResourceAllocation> createAllocation(@RequestBody ResourceAllocation allocation) {
        return ResponseEntity.ok(resourceAllocationService.createAllocation(allocation));
    }

    @GetMapping
    public ResponseEntity<List<ResourceAllocation>> getAllAllocations() {
        return ResponseEntity.ok(resourceAllocationService.getAllAllocations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceAllocation> getAllocationById(@PathVariable UUID id) {
        return resourceAllocationService.getAllocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ResourceAllocation>> getAllocationsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(resourceAllocationService.getAllocationsByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceAllocation> updateAllocation(@PathVariable UUID id, @RequestBody ResourceAllocation allocation) {
        return ResponseEntity.ok(resourceAllocationService.updateAllocation(id, allocation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllocation(@PathVariable UUID id) {
        resourceAllocationService.deleteAllocation(id);
        return ResponseEntity.ok().build();
    }
}