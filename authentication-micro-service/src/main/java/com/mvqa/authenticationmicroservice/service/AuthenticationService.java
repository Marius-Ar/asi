package com.mvqa.authenticationmicroservice.service;


import org.springframework.stereotype.Service;


@Service
public class AuthenticationService {

        public boolean isValidSession(String userId) {
            return true;
        }
}