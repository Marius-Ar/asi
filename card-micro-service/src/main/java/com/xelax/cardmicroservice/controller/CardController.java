package com.mvqa.cardmicroservice.controller;

import com.mvqa.cardmicroservice.mapper.CardMapper;
import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.service.CardService;
import com.mvqa.common.dto.CardDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public List<Card> getUserCardsAbleToFight(@CookieValue(name = "userId") Long userId) {
        return cardService.findUserCardsAbleToFight(userId);
    }

    @GetMapping("/user")
    public List<CardDTO> getUsersCards(@CookieValue(name = "userId") Long userId) {
        return cardMapper.toDtos(cardService.findUserCards(userId));
    }

    @PostMapping("/sell/{id}")
    public CardDTO sellCard(@PathVariable Long id) {
        return cardMapper.toDto(cardService.sellCard(id));
    }

    @PostMapping("/add/{id}")
    public CardDTO addCardToUser(@PathVariable Long id, @RequestBody Long buyerId) {
        return cardMapper.toDto(cardService.addCardToUser(id, buyerId));
    }
}