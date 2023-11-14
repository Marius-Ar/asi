package com.mvqa.usermicroservice.controller;


import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserDetailsDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.mapper.UserMapper;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }
    @GetMapping
    public UserDetailsDTO getUserDetails(@CookieValue(name = "userId") Long userId) {
        return userMapper.toUserDetailsDTO(userService.findById(userId));
    }

    @PostMapping("/register")
    public  ResponseEntity<?>  registerUser(@RequestBody UserRegisterDTO userRegisterDTO) {
        try {
            userService.saveUser(userRegisterDTO);
        }catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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
    public UserDTO updateUserBalance(@PathVariable Long id, @RequestBody Double amount) {
        return userMapper.toDto(userService.updateUserBalance(id, amount));
    }
}