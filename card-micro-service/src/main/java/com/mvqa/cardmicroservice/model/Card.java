package com.mvqa.cardmicroservice.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "name")
    private String name;

    @Column(name = "family_name")
    private String familyName;

    @Column(name = "hp")
    private Double hp;

    @Column(name = "attack")
    private Double attack;

    @Column(name = "energy")
    private Double energy;

    @Column(name = "defense")
    private Double defense;

    @Column(name = "actual_value")
    private Double actualValue;

    @Column(name = "image_url")
    private String imageUrl;
    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<UserCard> userCards;

    public Card() {
        this.userCards = new HashSet<>();
    }

    public Card(Long id, String description, String name, String familyName, Double hp, Double attack, Double energy, Double defense, Double actualValue, String imageUrl) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.familyName = familyName;
        this.hp = hp;
        this.attack = attack;
        this.energy = energy;
        this.defense = defense;
        this.actualValue = actualValue;
        this.imageUrl = imageUrl;
        this.userCards = new HashSet<>();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public Card setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Card setName(String name) {
        this.name = name;
        return this;
    }

    public Double getHp() {
        return hp;
    }

    public Card setHp(Double hp) {
        this.hp = hp;
        return this;
    }

    public Double getAttack() {
        return attack;
    }

    public Card setAttack(Double attack) {
        this.attack = attack;
        return this;
    }

    public Double getDefense() {
        return defense;
    }

    public Card setDefense(Double defense) {
        this.defense = defense;
        return this;
    }

    public Double getActualValue() {
        return actualValue;
    }

    public Card setActualValue(Double actualValue) {
        this.actualValue = actualValue;
        return this;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public Double getEnergy() {
        return energy;
    }

    public void setEnergy(Double energy) {
        this.energy = energy;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<UserCard> getUserCards() {
        return userCards;
    }

    public Card setUserCards(Set<UserCard> userCards) {
        this.userCards = userCards;
        return this;
    }

    public void addUserCard(UserCard userCard) {
        this.userCards.add(userCard);
    }

    public void removeUserCard(UserCard userCard) {
        this.userCards.remove(userCard);
    }
}