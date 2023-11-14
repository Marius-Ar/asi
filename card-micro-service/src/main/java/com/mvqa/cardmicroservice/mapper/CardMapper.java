package com.mvqa.cardmicroservice.mapper;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.common.dto.CardDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
public class CardMapper {

    public CardDTO toDto(Card card) {
        return new CardDTO(
                card.getId(),
                card.getDescription(),
                card.getName(),
                card.getFamilyName(),
                card.getHp(),
                card.getAttack(),
                card.getEnergy(),
                card.getDefense(),
                card.getActualValue(),
                card.getImageUrl());
    }

    public List<CardDTO> toDtos(Iterable<Card> cards) {
        return StreamSupport.stream(cards.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public Card toDomain(CardDTO cardDTO) {
        return new Card(
                cardDTO.id(),
                cardDTO.description(),
                cardDTO.name(),
                cardDTO.familyName(),
                cardDTO.hp(),
                cardDTO.attack(),
                cardDTO.energy(),
                cardDTO.defense(),
                cardDTO.actualValue(),
                cardDTO.imageUrl()
        );
    }
}
