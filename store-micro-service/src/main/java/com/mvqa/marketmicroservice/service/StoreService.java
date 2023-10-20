package com.mvqa.marketmicroservice.service;

import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.common.dto.UserDTO;
import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.repository.StoreListingRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class StoreService {

    private final StoreListingRepository storeListingRepository;

    private final RestTemplate restTemplate;

    public StoreService(StoreListingRepository storeListingRepository) {
        this.storeListingRepository = storeListingRepository;
        this.restTemplate = new RestTemplate();
    }

    public List<StoreListing> findAllActive() {
        return storeListingRepository.findAllBySellDateNull();
    }

    public StoreListing findOneById(long id) {
        return storeListingRepository.findById(id).orElseThrow();
    }

    public StoreListing buyCard(Long id, Long buyerId) {
        StoreListing cardListing = storeListingRepository.findById(id).orElseThrow();
        if (Objects.equals(buyerId, cardListing.getSellerId())) {
            throw new IllegalArgumentException("L'acheteur ne peut pas être le vendeur");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, "userId=" + 1);
        headers.add(HttpHeaders.CONTENT_TYPE, "application/json");

        HttpEntity<Double> entity = new HttpEntity<>(-cardListing.getPrice(), headers);
        //Màj de la balance de l'acheteur et du vendeur
        restTemplate.exchange("http://user-service/user/" + buyerId + "/balance", HttpMethod.POST, entity, UserDTO.class);

        entity = new HttpEntity<>(cardListing.getPrice(), headers);
        restTemplate.exchange("http://user-service/user/" + cardListing.getSellerId() + "/balance", HttpMethod.POST, entity, UserDTO.class);

        System.out.println("Balance ok");

        HttpEntity<Long> entity2 = new HttpEntity<>(buyerId, headers);
        //Ajouter card au buyer si les appels précédents ont fonctionné
        restTemplate.exchange("http://card-service/card/add/" + cardListing.getCardId(), HttpMethod.POST, entity2, Object.class);

        // Update listing
        storeListingRepository.save(cardListing.setBuyerId(buyerId).setSellDate(LocalDate.now()));
        return cardListing;
    }

    public StoreListing sellCard(@NotNull CardSellDTO card, @NotNull Long sellerId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.COOKIE, "userId=" + sellerId);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        restTemplate.exchange("http://card-service/card/sell/" + card.id(), HttpMethod.POST, entity, Object.class);
        return storeListingRepository.save(
                new StoreListing()
                        .setCardId(card.id())
                        .setDate(LocalDate.now())
                        .setSellerId(sellerId)
                        .setPrice(card.price())
        );
    }
}
