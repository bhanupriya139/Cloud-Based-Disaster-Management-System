package com.disaster.resource_allocation.controller;

import com.disaster.resource_allocation.model.AidRequest;
import com.disaster.resource_allocation.service.AidRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/aid-requests")
public class AidRequestController {

    @Autowired
    private AidRequestService aidRequestService;

    @PostMapping
    public ResponseEntity<AidRequest> createAidRequest(@RequestBody AidRequest aidRequest) {
        return ResponseEntity.ok(aidRequestService.createAidRequest(aidRequest));
    }

    @GetMapping
    public ResponseEntity<List<AidRequest>> getAllAidRequests() {
        return ResponseEntity.ok(aidRequestService.getAllAidRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AidRequest> getAidRequestById(@PathVariable UUID id) {
        return aidRequestService.getAidRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AidRequest>> getAidRequestsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(aidRequestService.getAidRequestsByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AidRequest> updateAidRequest(@PathVariable UUID id, @RequestBody AidRequest aidRequest) {
        return ResponseEntity.ok(aidRequestService.updateAidRequest(id, aidRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAidRequest(@PathVariable UUID id) {
        aidRequestService.deleteAidRequest(id);
        return ResponseEntity.ok().build();
    }
}