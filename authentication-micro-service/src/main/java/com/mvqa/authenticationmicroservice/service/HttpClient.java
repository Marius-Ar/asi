package com.mvqa.authenticationmicroservice.service;

import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;
@Service
public class HttpClient {

    @Value("${services.API_USER}")
    String userApiUri;
    RestTemplate restTemplate = new RestTemplate();


    public UUID login(UserDTO userDTO) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserDTO> entity = new HttpEntity<>(userDTO, headers);

        ResponseEntity<UUID> response;
        try {
            response = restTemplate.exchange(userApiUri.concat("/login"), HttpMethod.POST, entity, UUID.class);
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException( e.getStatusCode(), e.getResponseBodyAsString());
        }

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return response.getBody();
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erreur interne du serveur");
        }
    }

    public void registerUser(UserRegisterDTO userRegisterDTO) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<UserRegisterDTO> request = new HttpEntity<>(userRegisterDTO, headers);

        try {
            restTemplate.postForEntity(userApiUri.concat("/register"), request, String.class);
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getMessage());
        }
    }
}
