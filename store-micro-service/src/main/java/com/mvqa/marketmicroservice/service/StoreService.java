package com.mvqa.marketmicroservice.service;

import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.common.queue.QueueClient;
import com.mvqa.marketmicroservice.dto.StoreBoughtNotificationDto;
import com.mvqa.marketmicroservice.dto.StoreNotificationDto;
import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.repository.StoreListingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class StoreService {

    private final StoreListingRepository storeListingRepository;

    private QueueClient queueClient;

    public StoreService(StoreListingRepository storeListingRepository, QueueClient queueClient) {
        this.storeListingRepository = storeListingRepository;
        this.queueClient = queueClient;
    }

    public StoreListing postStoreListing(UUID sellerId, CardSellDTO card, UUID notificationSessionId) {
        StoreListing storeListing = new StoreListing()
                .setCardId(card.id())
                .setDate(LocalDate.now())
                .setSellerId(sellerId)
                .setPrice(card.price()
                );
        queueClient.setQueue("storeListingCreationQueue");
        queueClient.sendMessage(new StoreNotificationDto(storeListing, notificationSessionId));
        return storeListing;
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


    public void boughtCard(StoreListing cardListing, UUID notificationSessionId, UUID buyerId) {
        queueClient.setQueue("storeListingBoughtQueue");
        queueClient.sendMessage(new StoreBoughtNotificationDto(cardListing, notificationSessionId, buyerId));
    }


}
