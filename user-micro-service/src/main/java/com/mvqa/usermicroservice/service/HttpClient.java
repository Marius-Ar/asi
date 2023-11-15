package com.mvqa.usermicroservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service

public class HttpClient {

    @Value("${services.API_CARD}")
    String cardApiUri;
    RestTemplate restTemplate = new RestTemplate();

    public void addCardsToRegisteredUser(UUID userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, "userId=" + userId);
        headers.setContentType(MediaType.APPLICATION_JSON);
        try {
            restTemplate.exchange(cardApiUri.concat("/user/register/" + userId), HttpMethod.POST, null, Object.class);
        } catch (HttpClientErrorException e) {
            System.out.println("yo" + e);
        }

    }


}
