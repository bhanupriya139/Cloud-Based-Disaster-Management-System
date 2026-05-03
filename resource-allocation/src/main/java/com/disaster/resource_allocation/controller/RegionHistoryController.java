package com.disaster.resource_allocation.controller;

import com.disaster.resource_allocation.model.RegionHistory;
import com.disaster.resource_allocation.service.RegionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/region-history")
public class RegionHistoryController {

    @Autowired
    private RegionHistoryService regionHistoryService;

    @PostMapping
    public ResponseEntity<RegionHistory> createRegionHistory(@RequestBody RegionHistory regionHistory) {
        return ResponseEntity.ok(regionHistoryService.createRegionHistory(regionHistory));
    }

    @GetMapping
    public ResponseEntity<List<RegionHistory>> getAllRegionHistory() {
        return ResponseEntity.ok(regionHistoryService.getAllRegionHistory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegionHistory> getRegionHistoryById(@PathVariable UUID id) {
        return regionHistoryService.getRegionHistoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/region/{regionName}")
    public ResponseEntity<List<RegionHistory>> getByRegionName(@PathVariable String regionName) {
        return ResponseEntity.ok(regionHistoryService.getByRegionName(regionName));
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<RegionHistory>> getByState(@PathVariable String state) {
        return ResponseEntity.ok(regionHistoryService.getByState(state));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegionHistory> updateRegionHistory(@PathVariable UUID id, @RequestBody RegionHistory regionHistory) {
        return ResponseEntity.ok(regionHistoryService.updateRegionHistory(id, regionHistory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegionHistory(@PathVariable UUID id) {
        regionHistoryService.deleteRegionHistory(id);
        return ResponseEntity.ok().build();
    }
}