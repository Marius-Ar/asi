package com.mvqa.cardmicroservice.controller;

import com.mvqa.cardmicroservice.mapper.CardMapper;
import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.service.CardService;
import com.mvqa.common.dto.CardDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;

    private final CardMapper cardMapper;

    public CardController(CardService cardService, CardMapper cardMapper) {
        this.cardService = cardService;
        this.cardMapper = cardMapper;
    }

    @GetMapping
    public List<CardDTO> getCards() {
        return cardMapper.toDtos(cardService.getAll());
    }

    @GetMapping("/{id}")
    public CardDTO getCard(@PathVariable Long id) {
        return cardMapper.toDto(cardService.getCard(id));
    }

    @GetMapping("/user/fight")
    public List<Card> getUserCardsAbleToFight(@CookieValue(name = "userId") UUID userId) {
        return cardService.findUserCardsAbleToFight(userId);
    }

    @GetMapping("/user")
    public List<CardDTO> getUsersCards(@CookieValue(name = "userId") UUID userId) {
        return cardMapper.toDtos(cardService.findUserCards(userId));
    }

    @PostMapping("/user/register/{userId}")
    public void registerUserCards(@PathVariable UUID userId) {
        if (!cardService.registerUserCards(userId)) {
            throw new IllegalArgumentException("User already got his cards.");
        }
    }

    @PostMapping("/sell/{id}")
    public ResponseEntity<?> sellCard(@CookieValue(name = "userId") UUID userId, @CookieValue(name = "notificationSessionId") UUID notificationSessionId, @PathVariable Long id) {
        try {
            cardService.sellCard(userId, id, notificationSessionId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body("Card is being sold");
    }

    @PostMapping("/add/{id}")
    public ResponseEntity<?> addCardToUser(@PathVariable Long id, @RequestBody UUID buyerId, @CookieValue(name = "notificationSessionId") UUID notificationSessionId) {
        try {
            cardService.addCardToUser(id, buyerId, notificationSessionId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body("Card is being added");
    }

    @PostMapping("/cardsByIds")
    public List<CardDTO> getCardsByIds(@RequestBody List<Long> cardIds) {
        Iterable<Card> cards = cardService.getCardsByIds(cardIds);
        return cardMapper.toDtos(cards);
    }
}