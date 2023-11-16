package com.mvqa.cardmicroservice.service;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.model.UserCard;
import com.mvqa.cardmicroservice.repository.CardRepository;
import com.mvqa.cardmicroservice.repository.UserCardRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
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


    public Card addCardToUser(Long cardId, UUID userId) {
        Card card = cardRepository.findById(cardId).orElseThrow(() -> new RuntimeException("Card not found"));
        card.addUserCard(new UserCard(userId, card));
        return cardRepository.save(card);

    }

    public Card sellCard(UUID userId, Long cardId) {
        System.out.println(userId);

        List<UserCard> userCards = userCardRepository.findByUserId(userId);
        System.out.println(userCards.size());
        for (UserCard userCard : userCards) {
            if (userCard.getCard().getId().equals(cardId)) {
                userCardRepository.delete(userCard);
                return userCard.getCard();
            }
        }
        return null;
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