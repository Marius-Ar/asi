package com.mvqa.cardmicroservice.service;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.repository.CardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<Card> findUserCards(long userId) {
        return cardRepository.findByUserId(userId);
    }

    public Card sellCard(Long id) {
        return cardRepository.save(findCardById(id).setUserId(null));
    }

    public Card addCardToUser(Long id, Long userId) {
        return cardRepository.save(findCardById(id).setUserId(userId));
    }

    public List<Card> findUserCardsAbleToFight(long userId) {
        return cardRepository.findByUserIdAndEnergyIsGreaterThan(userId,0.0);
    }
}