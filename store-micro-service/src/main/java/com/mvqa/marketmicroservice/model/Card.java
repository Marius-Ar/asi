package com.mvqa.marketmicroservice.model;


import jakarta.persistence.*;

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


    public Card() { }


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
}