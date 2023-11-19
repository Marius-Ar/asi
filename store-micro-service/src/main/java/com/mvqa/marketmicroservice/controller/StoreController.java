package com.mvqa.marketmicroservice.controller;

import com.mvqa.common.dto.CardDTO;
import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.common.dto.MarketCardDTO;
import com.mvqa.marketmicroservice.mapper.MarketCardMapper;
import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.service.HttpClient;
import com.mvqa.marketmicroservice.service.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/store")
public class StoreController {

    private final StoreService storeService;
    private final HttpClient httpClient;
    private final MarketCardMapper marketCardMapper;

    public StoreController(StoreService storeService, HttpClient httpClient, MarketCardMapper marketCardMapper) {
        this.storeService = storeService;
        this.httpClient = httpClient;
        this.marketCardMapper = marketCardMapper;
    }

    @RequestMapping("/listing")
    public List<MarketCardDTO> getActiveListings(@CookieValue(name = "userId") UUID userId) {
        List<StoreListing> storeListings = storeService.findAllActive();
        List<Long> cardIds = storeService.getCardIdFromStoreListing(storeListings);
        List<CardDTO> cardDTOS = httpClient.getListedCards(cardIds, userId);
        return marketCardMapper.toMarketCardsDto(storeListings, cardDTOS);
    }

    @GetMapping("/{id}")
    public StoreListing getstoreListing(@PathVariable Long id) {
        return storeService.findOneById(id);
    }

    @PostMapping("/sell")
    public ResponseEntity<?> sellCard(@RequestBody CardSellDTO cardSellDTO, @CookieValue(name = "userId") UUID userId, @CookieValue(name = "notificationSessionId") UUID notificationSessionId) {
        try {
            httpClient.sellCard(cardSellDTO, userId, notificationSessionId);
            return ResponseEntity.ok(storeService.postStoreListing(userId, cardSellDTO, notificationSessionId));
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }


    @PostMapping("/buy/{listingId}")
    public ResponseEntity<?> buyCard(@PathVariable Long listingId, @CookieValue(name = "userId") UUID userId, @CookieValue(name = "notificationSessionId") UUID notificationSessionId) {
        try {
            StoreListing cardListing = storeService.findOneById(listingId);
            this.httpClient.buyCard(cardListing, userId, notificationSessionId);
            storeService.boughtCard(cardListing, notificationSessionId, userId);
            return ResponseEntity.ok("Transaction is being processed");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

}
