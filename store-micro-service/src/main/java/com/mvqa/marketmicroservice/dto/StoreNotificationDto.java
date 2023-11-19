package com.mvqa.marketmicroservice.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mvqa.marketmicroservice.model.StoreListing;

import java.io.Serializable;
import java.util.UUID;

@JsonSerialize
public class StoreNotificationDto implements Serializable {
    private StoreListing storeListing;

    private UUID notificationSessionId;

    public StoreNotificationDto(StoreListing storeListing, UUID notificationSessionId) {
        this.storeListing = storeListing;
        this.notificationSessionId = notificationSessionId;
    }

    public StoreListing getStoreListing() {
        return storeListing;
    }

    public StoreNotificationDto setStoreListing(StoreListing storeListing) {
        this.storeListing = storeListing;
        return this;
    }

    public UUID getNotificationSessionId() {
        return notificationSessionId;
    }

    public StoreNotificationDto setNotificationSessionId(UUID notificationSessionId) {
        this.notificationSessionId = notificationSessionId;
        return this;
    }
}
