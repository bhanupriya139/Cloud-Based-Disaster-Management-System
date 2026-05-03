package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.AidRequest;
import com.disaster.resource_allocation.repository.AidRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AidRequestService {

    @Autowired
    private AidRequestRepository aidRequestRepository;

    public AidRequest createAidRequest(AidRequest aidRequest) {
        return aidRequestRepository.save(aidRequest);
    }

    public List<AidRequest> getAllAidRequests() {
        return aidRequestRepository.findAll();
    }

    public Optional<AidRequest> getAidRequestById(UUID id) {
        return aidRequestRepository.findById(id);
    }

    public List<AidRequest> getAidRequestsByStatus(String status) {
        return aidRequestRepository.findByStatus(status);
    }

    public AidRequest updateAidRequest(UUID id, AidRequest aidRequest) {
        aidRequest.setId(id);
        return aidRequestRepository.save(aidRequest);
    }

    public void deleteAidRequest(UUID id) {
        aidRequestRepository.deleteById(id);
    }
}