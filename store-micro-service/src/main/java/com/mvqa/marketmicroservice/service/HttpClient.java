package com.mvqa.marketmicroservice.service;

import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.marketmicroservice.model.StoreListing;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class HttpClient {

    private RestTemplate restTemplate;
    private HttpHeaders headers;

    @Value("${services.API_USER}")
    private String userApiUri;

    @Value("${services.API_CARD}")
    private String cardApiUri;

    public HttpClient() {
        this.restTemplate = new RestTemplate();
        this.headers = new HttpHeaders();
    }

    public StoreListing sellCard(@NotNull CardSellDTO card, @NotNull UUID sellerId) {
        headers.add(HttpHeaders.COOKIE, "userId=" + sellerId);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        restTemplate.exchange(cardApiUri.concat("/sell/" + card.id()), HttpMethod.POST, entity, Object.class);
        return new StoreListing()
                .setCardId(card.id())
                .setDate(LocalDate.now())
                .setSellerId(sellerId)
                .setPrice(card.price()
                );
    }
}
