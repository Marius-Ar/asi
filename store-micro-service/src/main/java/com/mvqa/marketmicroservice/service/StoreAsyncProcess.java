package com.mvqa.marketmicroservice.service;

import com.mvqa.marketmicroservice.dto.StoreBoughtNotificationDto;
import com.mvqa.marketmicroservice.dto.StoreNotificationDto;
import com.mvqa.marketmicroservice.repository.StoreListingRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class StoreAsyncProcess {

    private final JmsTemplate jmsTemplate;
    private StoreListingRepository storeListingRepository;

    @Value("${NOTIFICATION_QUEUE_NAME}")
    private String notificationQueueName;

    public StoreAsyncProcess(StoreListingRepository storeListingRepository, JmsTemplate jmsTemplate) {
        this.storeListingRepository = storeListingRepository;
        this.jmsTemplate = jmsTemplate;
    }

    @JmsListener(destination = "storeListingCreationQueue")
    public void processStoreListingCreation(StoreNotificationDto storeNotificationDto) {
        storeListingRepository.save(storeNotificationDto.getStoreListing());
        sendNotification(storeNotificationDto.getNotificationSessionId().toString(), "success", "Votre carte a été mise sur le marché.");
    }

    @JmsListener(destination = "storeListingBoughtQueue")
    public void processStoreListingBought(StoreBoughtNotificationDto storeBoughtNotificationDto) {
        try {
            storeListingRepository.save(storeBoughtNotificationDto.getStoreListing().setBuyerId(storeBoughtNotificationDto.getBuyerId()).setSellDate(LocalDate.now()));
            sendNotification(storeBoughtNotificationDto.getNotificationSessionId().toString(), "success", "La carte a été achetée.");

        } catch (Exception e) {
            sendNotification(storeBoughtNotificationDto.getNotificationSessionId().toString(), "error", "La carte n'a pas pu être achetée.");
        }
    }

    public void sendNotification(String userId, String type, String message) {
        String formattedMessage = String.join(";", userId, type, message);
        System.out.println("Sending a notification message: " + formattedMessage);
        jmsTemplate.convertAndSend(notificationQueueName, formattedMessage);
    }
}
