package com.mvqa.marketmicroservice;

import com.mvqa.marketmicroservice.service.HttpClient;
import com.mvqa.marketmicroservice.service.StoreService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataGenerator implements ApplicationRunner {

    private final StoreService storeService;
    private final HttpClient httpClient;
    public DataGenerator(StoreService storeService, HttpClient httpClient) {
        this.storeService = storeService;
        this.httpClient = httpClient;
    }


    @Override
    public void run(ApplicationArguments args) {
    }
}
