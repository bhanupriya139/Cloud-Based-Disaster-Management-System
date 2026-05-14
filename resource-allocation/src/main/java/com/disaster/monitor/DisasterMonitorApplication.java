package com.disaster.monitor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DisasterMonitorApplication {
    public static void main(String[] args) {
        SpringApplication.run(DisasterMonitorApplication.class, args);
    }
}