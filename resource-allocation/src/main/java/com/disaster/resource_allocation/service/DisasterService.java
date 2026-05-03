package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.Disaster;
import com.disaster.resource_allocation.repository.DisasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class DisasterService {

    @Autowired
    private DisasterRepository disasterRepository;

    // CREATE
    public Disaster createDisaster(Disaster disaster) {
        return disasterRepository.save(disaster);
    }

    // READ ALL
    public List<Disaster> getAllDisasters() {
        return disasterRepository.findAll();
    }

    // READ BY ID
    public Optional<Disaster> getDisasterById(UUID id) {
        return disasterRepository.findById(id);
    }

    // READ BY STATUS
    public List<Disaster> getDisastersByStatus(String status) {
        return disasterRepository.findByStatus(status);
    }

    // UPDATE
    public Disaster updateDisaster(UUID id, Disaster updatedDisaster) {
        updatedDisaster.setId(id);
        return disasterRepository.save(updatedDisaster);
    }

    // DELETE
    public void deleteDisaster(UUID id) {
        disasterRepository.deleteById(id);
    }
}