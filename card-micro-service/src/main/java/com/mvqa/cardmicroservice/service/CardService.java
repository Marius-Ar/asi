package com.mvqa.cardmicroservice.service;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.model.UserCard;
import com.mvqa.cardmicroservice.repository.CardRepository;
import com.mvqa.cardmicroservice.repository.UserCardRepository;
import com.mvqa.common.dto.UserCardNotificationDto;
import com.mvqa.common.queue.QueueClient;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final UserCardRepository userCardRepository;
    private QueueClient queueClient;


    public CardService(CardRepository cardRepository, UserCardRepository userCardRepository, QueueClient queueClient) {
        this.cardRepository = cardRepository;
        this.userCardRepository = userCardRepository;
        this.queueClient = queueClient;

    }

    public Iterable<Card> getCardsByIds(List<Long> cardIds) {
        return cardRepository.findAllById(cardIds);
    }

    public Card getCard(long id) {
        return cardRepository.findById(id).orElseThrow();
    }

    public Card findCardById(long id) {
        return cardRepository.findById(id).orElseThrow();
    }

    public List<Card> getAll() {
        return (List<Card>) cardRepository.findAll();
    }


    public void addCardToUser(Long cardId, UUID userId, UUID notificationSessionId) {
        queueClient.setQueue("cardBuyingQueue");
        queueClient.sendMessage(new UserCardNotificationDto(userId, notificationSessionId, cardId));

    }

    public void sellCard(UUID userId, Long cardId, UUID notificationSessionId) {
        queueClient.setQueue("cardSellQueue");
        queueClient.sendMessage(new UserCardNotificationDto(userId, notificationSessionId, cardId));
    }

    public List<Card> getRandomCards(int numberOfCards) {
        List<Card> allCards = getAll();
        Collections.shuffle(allCards);
        return allCards.stream().limit(numberOfCards).collect(Collectors.toList());
    }

    public boolean registerUserCards(UUID userId) {
        if (findUserCards(userId).isEmpty()) {
            List<Card> randomCards = getRandomCards(5);
            for (Card card : randomCards) {
                card.addUserCard(new UserCard(userId, card));
                cardRepository.save(card);
            }
            return true;
        }
        return false;
    }

    public List<Card> findUserCardsAbleToFight(UUID userId) {
        return (List<Card>) cardRepository.findAll();
    }


    public List<Card> findUserCards(UUID userId) {
        return userCardRepository.findByUserId(userId).stream()
                .map(UserCard::getCard)
                .collect(Collectors.toList());
    }
}