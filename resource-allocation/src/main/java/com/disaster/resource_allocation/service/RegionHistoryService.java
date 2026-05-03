package com.disaster.resource_allocation.service;

import com.disaster.resource_allocation.model.RegionHistory;
import com.disaster.resource_allocation.repository.RegionHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RegionHistoryService {

    @Autowired
    private RegionHistoryRepository regionHistoryRepository;

    public RegionHistory createRegionHistory(RegionHistory regionHistory) {
        return regionHistoryRepository.save(regionHistory);
    }

    public List<RegionHistory> getAllRegionHistory() {
        return regionHistoryRepository.findAll();
    }

    public Optional<RegionHistory> getRegionHistoryById(UUID id) {
        return regionHistoryRepository.findById(id);
    }

    public List<RegionHistory> getByRegionName(String regionName) {
        return regionHistoryRepository.findByRegionName(regionName);
    }

    public List<RegionHistory> getByState(String state) {
        return regionHistoryRepository.findByState(state);
    }

    public RegionHistory updateRegionHistory(UUID id, RegionHistory regionHistory) {
        regionHistory.setId(id);
        return regionHistoryRepository.save(regionHistory);
    }

    public void deleteRegionHistory(UUID id) {
        regionHistoryRepository.deleteById(id);
    }
}