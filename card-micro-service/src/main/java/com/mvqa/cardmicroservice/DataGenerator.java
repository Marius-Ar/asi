package com.mvqa.cardmicroservice;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.repository.CardRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataGenerator implements ApplicationRunner {

    private static final String POKEMON_IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/@{id}@.png";
    private final CardRepository cardRepository;
    private final String[] pokemonNames = {
            "Pikachu",
            "Bulbasaur",
            "Charmander",
            "Squirtle",
            "Jigglypuff",
            "Meowth",
            "Psyduck",
            "Geodude",
            "Eevee",
            "Snorlax"
    };

    public DataGenerator(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        createCards(0, 9);
    }

    public List<Card> createCards(int start, int end) {
        List<Card> cards = new ArrayList<>();
        for (int i = start; i < end; i++) {
            Card card = new Card();
            card.setName(pokemonNames[i]);
            card.setDescription("This is a description for " + pokemonNames[i]);
            card.setFamilyName("Pokemon");
            card.setHp(100.0 + i);
            card.setDefense(50.0 + i);
            card.setAttack(75.0 + i);
            card.setEnergy(62.0 + i * 0.45);
            card.setActualValue(10.5 + i);
            card.setImageUrl(POKEMON_IMAGE_URL.replace("@{id}@", String.valueOf(i + 1)));
            cards.add(card);
        }
        cardRepository.saveAll(cards);
        return cards;
    }
}
