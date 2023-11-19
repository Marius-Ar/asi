package com.mvqa.common.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.UUID;

@JsonSerialize
public class UserRegistrationWithNotificationDTO implements Serializable {
    private UserRegisterDTO userRegisterDTO;
    private UUID notificationSessionId;

    public UserRegistrationWithNotificationDTO(UserRegisterDTO userRegisterDTO, UUID notificationSessionId) {
        this.userRegisterDTO = userRegisterDTO;
        this.notificationSessionId = notificationSessionId;
    }

    public UserRegisterDTO getUserRegisterDTO() {
        return userRegisterDTO;
    }

    public UserRegistrationWithNotificationDTO setUserRegisterDTO(UserRegisterDTO userRegisterDTO) {
        this.userRegisterDTO = userRegisterDTO;
        return this;
    }

    public UUID getNotificationSessionId() {
        return notificationSessionId;
    }

    public UserRegistrationWithNotificationDTO setNotificationSessionId(UUID notificationSessionId) {
        this.notificationSessionId = notificationSessionId;
        return this;
    }
}
