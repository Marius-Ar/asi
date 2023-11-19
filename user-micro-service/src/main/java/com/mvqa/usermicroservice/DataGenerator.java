package com.mvqa.usermicroservice;

import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.service.HttpClient;
import com.mvqa.usermicroservice.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.UUID.randomUUID;

@Component
public class DataGenerator implements ApplicationRunner {

    private final UserService userService;
    private final HttpClient httpClient;

    public DataGenerator(UserService userService, HttpClient httpClient) {
        this.userService = userService;
        this.httpClient = httpClient;
    }

    @Override
    public void run(ApplicationArguments args) throws InterruptedException {

        userService.saveUser(new UserRegisterDTO("test@test.test", "password", "password", "Axel Perraud"), randomUUID());
        userService.saveUser(new UserRegisterDTO("example@example.example", "password", "password", "example"), randomUUID());
        // Pas beau mais la création des users utilisent la queue donc il faut attendre. Ce n'est pas un cas réel de créer des users au lancement dans tous les cas.
        Thread.sleep(3000);
        List<User> users = (List<User>) userService.findAll();
        httpClient.addCardsToRegisteredUser(users.get(0).getId());
        httpClient.addCardsToRegisteredUser(users.get(1).getId());

    }

}
