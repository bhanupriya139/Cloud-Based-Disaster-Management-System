package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.Resource;
import com.disaster.resource_allocation.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Optional<Resource> getResourceById(UUID id) {
        return resourceRepository.findById(id);
    }

    public Resource updateResource(UUID id, Resource resource) {
        resource.setId(id);
        return resourceRepository.save(resource);
    }

    public void deleteResource(UUID id) {
        resourceRepository.deleteById(id);
    }
}