package com.mvqa.cardmicroservice;

import com.mvqa.cardmicroservice.model.Card;
import com.mvqa.cardmicroservice.repository.CardRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataGenerator implements ApplicationRunner {

    private static final String POKEMON_IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/@{id}@.png";
    private final CardRepository cardRepository;
    private final String[] pokemonNames = {
            "Bulbasaur",
            "Ivysaur",
            "Venusaur",
            "Charmander",
            "Charmeleon",
            "Charizard",
            "Squirtle",
            "Wartortle",
            "Blastoise",
            "Caterpie",
            "Metapod",
            "Butterfree",
            "Weedle",
            "Kakuna",
            "Beedrill",
            "Pidgey",
            "Pidgeotto",
            "Pidgeot",
            "Rattata",
            "Raticate",
            "Spearow",
            "Fearow",
            "Ekans",
            "Arbok",
            "Pikachu",
            "Raichu",
            "Sandshrew",
            "Sandslash",
            "Nidoran♀",
            "Nidorina",
            "Nidoqueen",
            "Nidoran♂",
            "Nidorino",
            "Nidoking",
            "Clefairy",
            "Clefable",
            "Vulpix",
            "Ninetales",
    };


    public DataGenerator(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        createCards(pokemonNames.length);
    }

    public List<Card> createCards(int size) {
        List<Card> cards = new ArrayList<>();
        Random rand = new Random();


        for (int i = 0; i < size; i++) {
            Card card = new Card();
            card.setName(pokemonNames[i]);
            card.setDescription("This is a description for " + pokemonNames[i]);
            card.setFamilyName("Pokemon");
            card.setHp(Math.round((100.0 + rand.nextDouble() * 50) * 10) / 10.0);
            card.setDefense(Math.round((50.0 + rand.nextDouble() * 30) * 10) / 10.0);
            card.setAttack(Math.round((75.0 + rand.nextDouble() * 40) * 10) / 10.0);
            card.setEnergy(Math.round((62.0 + rand.nextDouble() * 20) * 10) / 10.0);
            card.setActualValue(card.getHp()); // Actual value equals to HP
            card.setImageUrl(POKEMON_IMAGE_URL.replace("@{id}@", String.valueOf(i + 1)));
            cards.add(card);
        }
        cardRepository.saveAll(cards);
        return cards;
    }
}
