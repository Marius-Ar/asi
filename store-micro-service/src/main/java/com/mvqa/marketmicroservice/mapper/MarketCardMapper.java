package com.mvqa.marketmicroservice.mapper;

import com.mvqa.common.dto.CardDTO;
import com.mvqa.common.dto.MarketCardDTO;
import com.mvqa.marketmicroservice.model.StoreListing;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class MarketCardMapper {


    public List<MarketCardDTO> toMarketCardsDto(List<StoreListing> listings, List<CardDTO> cardDtos) {
        Map<Long, CardDTO> cardDtoMap = cardDtos.stream()
                .collect(Collectors.toMap(CardDTO::id, card -> card));

        List<MarketCardDTO> marketCardsDto = new ArrayList<>();
        for (StoreListing listing : listings) {
            CardDTO cardDto = cardDtoMap.get(listing.getCardId());
            if (cardDto != null) {
                MarketCardDTO marketCardDto = new MarketCardDTO(
                        cardDto.id(),
                        listing.getId(),
                        listing.getPrice(),
                        listing.getSellerId(),
                        cardDto.description(),
                        cardDto.name(),
                        cardDto.familyName(),
                        cardDto.hp(),
                        cardDto.attack(),
                        cardDto.energy(),
                        cardDto.defense(),
                        cardDto.actualValue(),
                        cardDto.imageUrl()
                );
                marketCardsDto.add(marketCardDto);
            }
        }

        return marketCardsDto;
    }
}
