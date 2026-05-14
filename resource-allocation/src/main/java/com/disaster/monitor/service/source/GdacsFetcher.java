package com.disaster.monitor.service.source;

import com.disaster.monitor.dto.DisasterEventDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.w3c.dom.*;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

/**
 * Fetches disaster alerts from the Global Disaster Alert and Coordination System (GDACS).
 * RSS Feed: https://www.gdacs.org/xml/rss.xml
 * Free, no API key required.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GdacsFetcher {

    private final WebClient webClient;

    @Value("${disaster.api.gdacs.url}")
    private String gdacsUrl;

    private static final Map<String, String> TYPE_MAP = Map.of(
        "EQ", "earthquake",
        "TC", "tropical_cyclone",
        "FL", "flood",
        "VO", "volcano",
        "DR", "drought",
        "WF", "wildfire",
        "TS", "tsunami",
        "LS", "landslide"
    );

    private static final Map<String, String> ALERT_SEVERITY = Map.of(
        "Green",  "low",
        "Orange", "medium",
        "Red",    "critical"
    );

    public List<DisasterEventDto> fetch() {
        log.info("[GDACS] Fetching RSS feed");

        try {
            String xmlBody = webClient.get()
                .uri(gdacsUrl)
                .header("Accept", "application/xml, text/xml")
                .retrieve()
                .bodyToMono(String.class)
                .block();

            if (xmlBody == null || xmlBody.isBlank()) return Collections.emptyList();

            List<DisasterEventDto> result = parseRss(xmlBody);
            log.info("[GDACS] Fetched {} events", result.size());
            return result;

        } catch (Exception e) {
            log.error("[GDACS] Fetch failed: {}", e.getMessage());
            throw new RuntimeException("GDACS fetch failed: " + e.getMessage(), e);
        }
    }

    private List<DisasterEventDto> parseRss(String xml) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setNamespaceAware(true);
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.parse(new InputSource(new StringReader(xml)));

        NodeList items = doc.getElementsByTagName("item");
        List<DisasterEventDto> results = new ArrayList<>();

        for (int i = 0; i < items.getLength(); i++) {
            try {
                Element item = (Element) items.item(i);
                results.add(mapItem(item));
            } catch (Exception e) {
                log.warn("[GDACS] Skipping RSS item: {}", e.getMessage());
            }
        }
        return results;
    }

    private DisasterEventDto mapItem(Element item) {
        String title      = getText(item, "title");
        String link       = getText(item, "link");
        String pubDateStr = getText(item, "pubDate");
        String eventType  = getGdacsText(item, "eventtype");
        String eventId    = getGdacsText(item, "eventid");
        String alertLevel = getGdacsText(item, "alertlevel");
        String country    = getGdacsText(item, "country");
        String latStr     = getGeoText(item, "lat");
        String lonStr     = getGeoText(item, "long");
        String desc       = getText(item, "description");

        String disasterType = TYPE_MAP.getOrDefault(eventType, Optional.ofNullable(eventType)
                                  .map(String::toLowerCase).orElse("unknown"));
        String severity     = ALERT_SEVERITY.getOrDefault(alertLevel, "medium");

        Double lat = latStr != null && !latStr.isBlank() ? Double.parseDouble(latStr) : null;
        Double lon = lonStr != null && !lonStr.isBlank() ? Double.parseDouble(lonStr) : null;

        Instant startedAt = parseDate(pubDateStr);
        String uid = eventId != null ? eventId : String.valueOf(title.hashCode());

        Map<String, Object> rawData = new HashMap<>();
        rawData.put("title", title);
        rawData.put("link", link);
        rawData.put("eventType", eventType);
        rawData.put("alertLevel", alertLevel);
        rawData.put("country", country);

        DisasterEventDto dto = new DisasterEventDto();
        dto.setEventId("GDACS_" + uid);
        dto.setSource("GDACS");
        dto.setDisasterType(disasterType);
        dto.setTitle(title);
        dto.setDescription(desc);
        dto.setSeverity(severity);
        dto.setMagnitude(null);
        dto.setLatitude(lat);
        dto.setLongitude(lon);
        dto.setLocationName(country != null ? country : title);
        dto.setCountry(country);
        dto.setStatus("active");
        dto.setStartedAt(startedAt);
        dto.setEndedAt(null);
        dto.setExternalUrl(link);
        dto.setRawData(rawData);
        return dto;
    }

    private String getText(Element el, String tag) {
        NodeList nodes = el.getElementsByTagName(tag);
        if (nodes.getLength() == 0) return null;
        return nodes.item(0).getTextContent().trim();
    }

    private String getGdacsText(Element el, String localName) {
        NodeList nodes = el.getElementsByTagNameNS("*", localName);
        if (nodes.getLength() == 0) return null;
        return nodes.item(0).getTextContent().trim();
    }

    private String getGeoText(Element el, String localName) {
        NodeList nodes = el.getElementsByTagNameNS("http://www.w3.org/2003/01/geo/wgs84_pos#", localName);
        if (nodes.getLength() == 0) {
            // fallback: try without namespace
            nodes = el.getElementsByTagName("geo:" + localName);
        }
        if (nodes.getLength() == 0) return null;
        return nodes.item(0).getTextContent().trim();
    }

    private Instant parseDate(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return Instant.now();
        try {
            return DateTimeFormatter.RFC_1123_DATE_TIME
                .parse(dateStr, Instant::from);
        } catch (DateTimeParseException e) {
            return Instant.now();
        }
    }
}