package com.mvqa.cardmicroservice.service;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.model.UserCard;
import com.mvqa.cardmicroservice.repository.CardRepository;
import com.mvqa.cardmicroservice.repository.UserCardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final UserCardRepository userCardRepository;


    public CardService(CardRepository cardRepository, UserCardRepository userCardRepository) {
        this.cardRepository = cardRepository;
        this.userCardRepository = userCardRepository;
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


    public Card addCardToUser(Long cardId, UUID userId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new RuntimeException("Card not found"));
        card.addUserCard(new UserCard(userId, card));
        return cardRepository.save(card);

    }

    @Transactional
    public Card sellCard(UUID userId, Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new RuntimeException("Card not found"));
        card.getUserCards().removeIf(userCard -> userCard.getUserId().equals(userId));
        return cardRepository.save(card);
    }

    public boolean registerUserCards(UUID userId) {
        if (findUserCards(userId).isEmpty()) {
            for (long i = 1; i < 6; i++) {
                addCardToUser(i, userId);
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