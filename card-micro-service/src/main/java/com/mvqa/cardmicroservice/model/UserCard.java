package com.mvqa.cardmicroservice.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "user_card")
public class UserCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private UUID userId;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Card card;

    public Long getId() {
        return id;
    }

    public UUID getUserId() {
        return userId;
    }

    public UserCard setUserId(UUID userId) {
        this.userId = userId;
        return this;
    }

    public Card getCard() {
        return card;
    }

    public UserCard setCard(Card card) {
        this.card = card;
        return this;
    }
}