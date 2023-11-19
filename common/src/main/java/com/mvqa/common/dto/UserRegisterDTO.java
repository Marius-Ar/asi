package com.mvqa.common.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;

@JsonSerialize
public class UserRegisterDTO implements Serializable {
    String email;
    String password;
    String passwordConfirmation;
    String username;

    public UserRegisterDTO(String email, String password, String passwordConfirmation, String username) {
        this.email = email;
        this.password = password;
        this.passwordConfirmation = passwordConfirmation;
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public UserRegisterDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserRegisterDTO setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public UserRegisterDTO setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserRegisterDTO setUsername(String username) {
        this.username = username;
        return this;
    }
}
