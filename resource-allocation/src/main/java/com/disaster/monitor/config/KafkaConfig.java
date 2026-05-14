package com.disaster.monitor.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Value("${kafka.topic.disaster-events}")
    private String disasterEventsTopic;

    @Value("${kafka.topic.disaster-alerts}")
    private String disasterAlertsTopic;

    @Bean
    public NewTopic disasterEventsTopic() {
        return TopicBuilder.name(disasterEventsTopic)
            .partitions(3)
            .replicas(1)
            .build();
    }

    @Bean
    public NewTopic disasterAlertsTopic() {
        return TopicBuilder.name(disasterAlertsTopic)
            .partitions(3)
            .replicas(1)
            .build();
    }
}