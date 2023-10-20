package com.mvqa.marketmicroservice;

import com.mvqa.marketmicroservice.service.StoreService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataGenerator implements ApplicationRunner {

    private final StoreService storeService;


    public DataGenerator(StoreService storeService) {
        this.storeService = storeService;
    }

    @Override
    public void run(ApplicationArguments args) {
        /*storeService.sellCard(
                new CardSellDTO(6L, 100.0),
                2L
        );*/
    }
}
