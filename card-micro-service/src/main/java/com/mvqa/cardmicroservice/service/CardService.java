package com.mvqa.cardmicroservice.service;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.repository.CardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CardService {
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card getCard(long id){
        return cardRepository.findById(id).orElseThrow();
    }

    public Card findCardById(long id){
        return cardRepository.findById(id).orElseThrow();
    }

    public List<Card> getAll() {
        return (List<Card>) cardRepository.findAll();
    }

    public List<Card> findUserCards(UUID userId) {
        return  (List<Card>) cardRepository.findAll();
    }

    public Card sellCard(Long id,UUID userId) {
        return cardRepository.save(findCardById(id));
    }

    public Card addCardToUser(Long id, UUID userId) {
        return cardRepository.save(findCardById(id));
    }

    public List<Card> findUserCardsAbleToFight(UUID userId) {
        return (List<Card>) cardRepository.findAll();
    }
    @Transactional
    public void removeUserFromCard(UUID userId, Long cardId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new RuntimeException("Card not found"));
        card.getUserCards().removeIf(userCard -> userCard.getUserId().equals(userId));
        cardRepository.save(card);
    }
}