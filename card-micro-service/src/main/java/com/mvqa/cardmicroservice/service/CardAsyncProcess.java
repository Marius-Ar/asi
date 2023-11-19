package com.mvqa.cardmicroservice.service;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.model.UserCard;
import com.mvqa.cardmicroservice.repository.CardRepository;
import com.mvqa.cardmicroservice.repository.UserCardRepository;
import com.mvqa.common.dto.UserCardNotificationDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardAsyncProcess {

    private final JmsTemplate jmsTemplate;
    @Value("${NOTIFICATION_QUEUE_NAME}")
    private String notificationQueueName;

    private UserCardRepository userCardRepository;
    private CardRepository cardRepository;


    public CardAsyncProcess(JmsTemplate jmsTemplate, UserCardRepository userCardRepository, CardRepository cardRepository) {
        this.jmsTemplate = jmsTemplate;
        this.userCardRepository = userCardRepository;
        this.cardRepository = cardRepository;
    }

    @JmsListener(destination = "cardSellQueue")
    public void processCardSelling(UserCardNotificationDto userCardNotificationDto) {
        List<UserCard> userCards = userCardRepository.findByUserId(userCardNotificationDto.getUserId());
        Long cardId = userCardNotificationDto.getCardId();
        boolean cardFound = false;
        for (UserCard userCard : userCards) {
            if (userCard.getCard().getId().equals(cardId)) {
                userCardRepository.delete(userCard);
                cardFound = true;
                sendNotification(userCardNotificationDto.getNotificationSessionId().toString(), "success", "Card : Votre carte est bien sur le marché.");
            }
        }
        if (!cardFound) {
            sendNotification(userCardNotificationDto.getNotificationSessionId().toString(), "error", "Votre carte n'a pas pu être mise  sur le marché.");
        }
    }

    @Transactional
    @JmsListener(destination = "cardBuyingQueue")
    public void processCardBuying(UserCardNotificationDto userCardNotificationDto) {
        try {
            Card card = cardRepository.findById(userCardNotificationDto.getCardId()).orElseThrow();
            card.addUserCard(new UserCard(userCardNotificationDto.getUserId(), card));
            cardRepository.save(card);
            sendNotification(userCardNotificationDto.getNotificationSessionId().toString(), "success", "Votre carte a été ajoutée à votre inventaire.");
        } catch (Exception e) {
            sendNotification(userCardNotificationDto.getNotificationSessionId().toString(), "error", "La carte n'a pas pu être achetée.");

        }
    }


    public void sendNotification(String userId, String type, String message) {
        String formattedMessage = String.join(";", userId, type, message);
        System.out.println("Sending a notification message: " + formattedMessage);
        jmsTemplate.convertAndSend(notificationQueueName, formattedMessage);
    }
}




