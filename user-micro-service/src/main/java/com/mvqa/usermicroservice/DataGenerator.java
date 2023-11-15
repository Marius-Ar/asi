package com.mvqa.usermicroservice;

import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.service.HttpClient;
import com.mvqa.usermicroservice.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataGenerator implements ApplicationRunner {

    private final UserService userService;
    private final HttpClient httpClient;

    public DataGenerator(UserService userService, HttpClient httpClient) {
        this.userService = userService;
        this.httpClient = httpClient;
    }

    @Override
    public void run(ApplicationArguments args) {

        User user1 = userService.saveUser(new UserRegisterDTO("test@test.test", "password", "password", "Axel Perraud"));
        httpClient.addCardsToRegisteredUser(user1.getId());
        User user2 = userService.saveUser(new UserRegisterDTO("example@example.example", "password", "password", "example"));
        httpClient.addCardsToRegisteredUser(user2.getId());

    }

}
