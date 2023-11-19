package com.mvqa.marketmicroservice.service;

import com.mvqa.common.dto.CardDTO;
import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.common.dto.UserDTO;
import com.mvqa.marketmicroservice.model.StoreListing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class HttpClient {

    private RestTemplate restTemplate;

    @Value("${services.API_USER}")
    private String userApiUri;

    @Value("${services.API_CARD}")
    private String cardApiUri;

    public HttpClient() {
        this.restTemplate = new RestTemplate();
    }

    public List<CardDTO> getListedCards(List<Long> cardIds, UUID userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HttpHeaders.COOKIE, "userId=" + userId);
        HttpEntity<List<Long>> entity = new HttpEntity<>(cardIds, headers);
        try {
            ResponseEntity<List<CardDTO>> response = restTemplate.exchange(
                    cardApiUri.concat("/cardsByIds"),
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<List<CardDTO>>() {
                    }
            );
            return response.getBody();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

    }

    public void sellCard(@NotNull CardSellDTO card, @NotNull UUID sellerId, @NotNull UUID notificationSessionId) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HttpHeaders.COOKIE, "notificationSessionId=" + notificationSessionId);
        headers.add(HttpHeaders.COOKIE, "userId=" + sellerId);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        try {
            restTemplate.exchange(cardApiUri.concat("/sell/" + card.id()), HttpMethod.POST, entity, String.class);
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getMessage());
        }
    }

    public StoreListing buyCard(StoreListing cardListing, UUID buyerId, UUID notificationSessionId) {
        if (Objects.equals(buyerId, cardListing.getSellerId())) {
            throw new IllegalArgumentException("L'acheteur ne peut pas être le vendeur");
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add(HttpHeaders.COOKIE, "userId=" + buyerId);
        headers.add(HttpHeaders.COOKIE, "notificationSessionId=" + notificationSessionId);

        HttpEntity<Double> entity = new HttpEntity<>(-cardListing.getPrice(), headers);
        //Màj de la balance de l'acheteur et du vendeur
        try {
            restTemplate.exchange(userApiUri.concat("/" + buyerId + "/balance"), HttpMethod.POST, entity, UserDTO.class);
            entity = new HttpEntity<>(cardListing.getPrice(), headers);
            restTemplate.exchange(userApiUri.concat("/" + cardListing.getSellerId() + "/balance"), HttpMethod.POST, entity, UserDTO.class);

            HttpEntity<UUID> entity2 = new HttpEntity<>(buyerId, headers);
            //Ajouter card au buyer si les appels précédents ont fonctionné
            restTemplate.exchange(cardApiUri.concat("/add/" + cardListing.getCardId()), HttpMethod.POST, entity2, String.class);
            // Update listing
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(e.getStatusCode(), e.getMessage());
        }

        return cardListing;
    }
}
