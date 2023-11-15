package com.mvqa.marketmicroservice.service;

import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.repository.StoreListingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class StoreService {

    private final StoreListingRepository storeListingRepository;
    private final RestTemplate restTemplate;


    public StoreService(StoreListingRepository storeListingRepository) {
        this.storeListingRepository = storeListingRepository;
        this.restTemplate = new RestTemplate();
    }

    public StoreListing postStoreListing(StoreListing card) {
        return storeListingRepository.save(card);
    }

    public List<StoreListing> findAllActive() {
        return storeListingRepository.findAllBySellDateNull();
    }

    public StoreListing findOneById(long id) {
        return storeListingRepository.findById(id).orElseThrow();
    }

/*
    public StoreListing buyCard(long id, UUID buyerId) {
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
*/

}
