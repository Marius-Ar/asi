package com.mvqa.marketmicroservice.service;

import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.repository.StoreListingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

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

    public List<Long> getCardIdFromStoreListing(List<StoreListing> storeListing) {
        return storeListing.stream().map(StoreListing::getCardId).toList();
    }

    public StoreListing findOneById(long id) {
        return storeListingRepository.findById(id).orElseThrow();
    }


    public StoreListing boughtCard(StoreListing cardListing, UUID buyerId) {
        return storeListingRepository.save(cardListing.setBuyerId(buyerId).setSellDate(LocalDate.now()));
    }


}
