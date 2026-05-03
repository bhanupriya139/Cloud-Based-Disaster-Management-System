package com.disaster.resource_allocation.controller;

import com.disaster.resource_allocation.model.Disaster;
import com.disaster.resource_allocation.service.DisasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/disasters")
public class DisasterController {

    @Autowired
    private DisasterService disasterService;

    // CREATE
    @PostMapping
    public ResponseEntity<Disaster> createDisaster(@RequestBody Disaster disaster) {
        return ResponseEntity.ok(disasterService.createDisaster(disaster));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Disaster>> getAllDisasters() {
        return ResponseEntity.ok(disasterService.getAllDisasters());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Disaster> getDisasterById(@PathVariable UUID id) {
        return disasterService.getDisasterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // READ BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Disaster>> getDisastersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(disasterService.getDisastersByStatus(status));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Disaster> updateDisaster(@PathVariable UUID id, @RequestBody Disaster disaster) {
        return ResponseEntity.ok(disasterService.updateDisaster(id, disaster));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisaster(@PathVariable UUID id) {
        disasterService.deleteDisaster(id);
        return ResponseEntity.ok().build();
    }
}