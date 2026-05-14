package com.disaster.monitor.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.disaster.monitor.entity.ApiPollLog;

@Repository
public interface ApiPollLogRepository extends JpaRepository<ApiPollLog, Long> {
    List<ApiPollLog> findAllByOrderByPolledAtDesc(Pageable pageable);
    List<ApiPollLog> findBySourceOrderByPolledAtDesc(String source, Pageable pageable);
}