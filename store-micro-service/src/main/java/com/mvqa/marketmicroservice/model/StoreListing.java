package com.mvqa.marketmicroservice.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "store_listing")
public class StoreListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "card_id")
    private Long cardId;

    @Column(name = "price")
    private Double price;

    @Column(name = "buyer_id")
    private Long buyerId;

    @Column(name = "seller_id")
    private Long sellerId;

    @Column(name = "sell_date")
    private LocalDate sellDate;

    public StoreListing() {
    }

    public StoreListing(Long id, LocalDate date, Long cardId, Double price, Long buyerId, Long sellerId, LocalDate sellDate) {
        this.id = id;
        this.date = date;
        this.cardId = cardId;
        this.price = price;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.sellDate = sellDate;
    }

    public Long getId() {
        return id;
    }

    public StoreListing setId(Long id) {
        this.id = id;
        return this;
    }

    public LocalDate getDate() {
        return date;
    }

    public StoreListing setDate(LocalDate date) {
        this.date = date;
        return this;
    }

    public Double getPrice() {
        return price;
    }

    public StoreListing setPrice(Double price) {
        this.price = price;
        return this;
    }

    public LocalDate getSellDate() {
        return sellDate;
    }

    public StoreListing setSellDate(LocalDate sellDate) {
        this.sellDate = sellDate;
        return this;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public StoreListing setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
        return this;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public StoreListing setSellerId(Long sellerId) {
        this.sellerId = sellerId;
        return this;
    }

    public Long getCardId() {
        return cardId;
    }

    public StoreListing setCardId(Long cardId) {
        this.cardId = cardId;
        return this;
    }

}