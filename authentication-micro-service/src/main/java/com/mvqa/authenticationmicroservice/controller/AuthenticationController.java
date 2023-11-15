package com.mvqa.authenticationmicroservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mvqa.authenticationmicroservice.service.AuthenticationService;
import com.mvqa.authenticationmicroservice.service.HttpClient;
import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
public class AuthenticationController {

    private final HttpClient httpClient;
    private final AuthenticationService authenticationService;

    public AuthenticationController(HttpClient httpClient, AuthenticationService authenticationService) {
        this.httpClient = httpClient;
        this.authenticationService = authenticationService;
    }


    @GetMapping("/login/status")
    public ResponseEntity<?> checkLoginStatus(HttpServletRequest request) {
        // Vérifier la présence et la validité du cookie
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userId".equals(cookie.getName()) && authenticationService.isValidSession(cookie.getValue())) {
                    return ResponseEntity.ok().body("Utilisateur connecté");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur non connecté");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO loginUser, HttpServletResponse httpServletResponse, HttpServletRequest request) throws JsonProcessingException {
        try {
            UUID userId = httpClient.login(loginUser);
            Cookie cookie = new Cookie("userId", userId.toString());
            cookie.setMaxAge(60 * 30);
            cookie.setPath("/");
            //en prod cookie.setHttpOnly(true);
            httpServletResponse.addCookie(cookie);

            return ResponseEntity.ok().body(userId.toString());
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDTO userRegisterDTO) {
        try {
            httpClient.registerUser(userRegisterDTO);
            return ResponseEntity.ok("Inscription réussie");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }
}