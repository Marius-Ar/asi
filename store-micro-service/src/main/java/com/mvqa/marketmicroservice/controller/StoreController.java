package com.mvqa.marketmicroservice.controller;

import com.mvqa.common.dto.CardSellDTO;
import com.mvqa.marketmicroservice.model.StoreListing;
import com.mvqa.marketmicroservice.service.StoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store")
public class StoreController {

    private final StoreService storeService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
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
    public StoreListing sellCard(@RequestBody CardSellDTO cardSellDTO, @CookieValue(name = "userId") Long userId) {
        return storeService.sellCard(cardSellDTO, userId);
    }

    @PostMapping("/buy/{listingId}")
    public StoreListing buyCard(@PathVariable Long listingId, @CookieValue(name = "userId") Long userId) {
        return storeService.buyCard(listingId,userId);
    }
}
