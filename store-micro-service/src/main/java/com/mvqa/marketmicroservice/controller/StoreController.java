package com.mvqa.marketmicroservice.controller;

import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.service.HttpClient;
import com.mvqa.marketmicroservice.service.StoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/store")
public class StoreController {

    private final StoreService storeService;
    private final HttpClient httpClient;

    public StoreController(StoreService storeService, HttpClient httpClient) {
        this.storeService = storeService;
        this.httpClient = httpClient;
    }

    @RequestMapping("/listings")
    public List<StoreListing> getActiveListings() {
        return storeService.findAllActive();
    }

    @GetMapping("/{id}")
    public StoreListing getstoreListing(@PathVariable Long id) {
        return storeService.findOneById(id);
    }

    @PostMapping("/sell")
    public StoreListing sellCard(@RequestBody CardSellDTO cardSellDTO, @CookieValue(name = "userId") UUID userId) {
        return storeService.postStoreListing(httpClient.sellCard(cardSellDTO, userId));
    }

    @PostMapping("/buy/{listingId}")
    public StoreListing buyCard(@PathVariable Long listingId, @CookieValue(name = "userId") UUID userId) {
        return new StoreListing();
    }
}
