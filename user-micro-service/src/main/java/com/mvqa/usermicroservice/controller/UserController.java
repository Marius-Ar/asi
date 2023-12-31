package com.mvqa.usermicroservice.controller;


import com.mvqa.common.dto.UserChatDTO;
import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserDetailsDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.mapper.UserMapper;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.service.HttpClient;
import com.mvqa.usermicroservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;
    private final HttpClient httpClient;

    public UserController(UserService userService, UserMapper userMapper, HttpClient httpClient) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.httpClient = httpClient;
    }

    @GetMapping()
    public Iterable<UserChatDTO> getAllUsers() {
        return userMapper.usersToChatDto(userService.findAll());
    }

    @GetMapping("/details")
    public UserDetailsDTO getUserDetails(@CookieValue(name = "userId") UUID userId) {
        return userMapper.toUserDetailsDTO(userService.findById(userId));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterDTO userRegisterDTO, @CookieValue(name = "notificationSessionId") UUID notificationSessionId) {
        try {
            userService.saveUser(userRegisterDTO, notificationSessionId);
            //Obligé de faire ça à cause de l'ESB car je ne peux pas récupérer l'UUID auto généré en bdd
            Thread.sleep(3000);
            User user = userService.findByMail(userRegisterDTO.getEmail());
            httpClient.addCardsToRegisteredUser(user.getId());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Utilisateur enregistré avec succès");

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO loginUser) {
        User user = userService.findByMail(loginUser.email());
        if (user != null && userService.verifyPassword(loginUser.password(), user.getPassword())) {
            return ResponseEntity.ok(user.getId());
        } else {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Authentification échouée");
        }
    }


    @PostMapping("/{id}/balance")
    public ResponseEntity<?> updateUserBalance(@PathVariable UUID id, @RequestBody Double amount) {
        try {
            return ResponseEntity.ok(userMapper.toDto(userService.updateUserBalance(id, amount)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}