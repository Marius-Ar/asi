package com.mvqa.usermicroservice;

import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.service.UserService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataGenerator implements ApplicationRunner {

    private final UserService userService;

    public DataGenerator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(ApplicationArguments args) {
            userService.saveUser(new UserRegisterDTO("test@test.test", "password", "password", "Axel Perraud"));
            userService.saveUser(new UserRegisterDTO("example@example.example", "password", "password", "example"));
    }

}
