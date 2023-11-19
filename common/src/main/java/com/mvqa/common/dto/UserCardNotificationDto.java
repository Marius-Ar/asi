package com.mvqa.common.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.UUID;

@JsonSerialize
public class UserCardNotificationDto implements Serializable {

    private UUID userId;

    private UUID notificationSessionId;
    private Long cardId;


    public UserCardNotificationDto(UUID userId, UUID notificationSessionId, Long cardId) {
        this.userId = userId;
        this.notificationSessionId = notificationSessionId;
        this.cardId = cardId;
    }

    public UUID getUserId() {
        return userId;
    }

    public UserCardNotificationDto setUserId(UUID userId) {
        this.userId = userId;
        return this;
    }

    public UUID getNotificationSessionId() {
        return notificationSessionId;
    }

    public UserCardNotificationDto setNotificationSessionId(UUID notificationSessionId) {
        this.notificationSessionId = notificationSessionId;
        return this;
    }

    public Long getCardId() {
        return cardId;
    }

    public UserCardNotificationDto setCardId(Long cardId) {
        this.cardId = cardId;
        return this;
    }
}
