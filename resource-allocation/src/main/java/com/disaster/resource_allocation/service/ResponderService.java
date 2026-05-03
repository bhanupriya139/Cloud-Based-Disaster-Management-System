package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.Responder;
import com.disaster.resource_allocation.repository.ResponderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResponderService {

    @Autowired
    private ResponderRepository responderRepository;

    public Responder createResponder(Responder responder) {
        return responderRepository.save(responder);
    }

    public List<Responder> getAllResponders() {
        return responderRepository.findAll();
    }

    public Optional<Responder> getResponderById(UUID id) {
        return responderRepository.findById(id);
    }

    public Responder updateResponder(UUID id, Responder responder) {
        responder.setId(id);
        return responderRepository.save(responder);
    }

    public void deleteResponder(UUID id) {
        responderRepository.deleteById(id);
    }
}