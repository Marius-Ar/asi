package com.mvqa.common.dto;

public record UserRegisterDTO(
        String email,
        String password,
        String passwordConfirmation,
        String username
) {}
