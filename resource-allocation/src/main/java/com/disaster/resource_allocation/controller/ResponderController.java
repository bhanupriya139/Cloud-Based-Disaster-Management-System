package com.disaster.resource_allocation.controller;

import com.disaster.resource_allocation.model.Responder;
import com.disaster.resource_allocation.service.ResponderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/responders")
public class ResponderController {

    @Autowired
    private ResponderService responderService;

    @PostMapping
    public ResponseEntity<Responder> createResponder(@RequestBody Responder responder) {
        return ResponseEntity.ok(responderService.createResponder(responder));
    }

    @GetMapping
    public ResponseEntity<List<Responder>> getAllResponders() {
        return ResponseEntity.ok(responderService.getAllResponders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Responder> getResponderById(@PathVariable UUID id) {
        return responderService.getResponderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Responder> updateResponder(@PathVariable UUID id, @RequestBody Responder responder) {
        return ResponseEntity.ok(responderService.updateResponder(id, responder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponder(@PathVariable UUID id) {
        responderService.deleteResponder(id);
        return ResponseEntity.ok().build();
    }
}