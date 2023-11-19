package com.mvqa.marketmicroservice.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mvqa.marketmicroservice.model.StoreListing;

import java.io.Serializable;
import java.util.UUID;

@JsonSerialize
public class StoreBoughtNotificationDto extends StoreNotificationDto implements Serializable {
    private UUID buyerId;

    public StoreBoughtNotificationDto(StoreListing storeListing, UUID notificationSessionId, UUID buyerId) {
        super(storeListing, notificationSessionId);
        this.buyerId = buyerId;
    }

    public UUID getBuyerId() {
        return buyerId;
    }

    public StoreBoughtNotificationDto setBuyerId(UUID buyerId) {
        this.buyerId = buyerId;
        return this;
    }
}
