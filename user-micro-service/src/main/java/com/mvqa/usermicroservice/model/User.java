package com.mvqa.usermicroservice.model;


import jakarta.persistence.*;

import javax.validation.constraints.NotNull;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    @NotNull(message = "Name is required")
    private String username;

    @Column(name = "mail", unique = true)
    @NotNull(message = "Email is required")
    private String mail;

    @Column(name = "password")
    @NotNull(message = "Password is required")
    private String password;

    @Column(name = "balance")
    private Double balance;

    public User() {

    }

    public User(@NotNull String username, @NotNull String mail, @NotNull String password) {
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.balance = 500.0;
    }

    public Long getId() {
        return id;
    }

    public User setId(Long id) {
        this.id = id;
        return this;
    }


    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getMail() {
        return mail;
    }

    public User setMail(String mail) {
        this.mail = mail;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public Double getBalance() {
        return balance;
    }

    public User setBalance(Double balance) {
        this.balance = balance;
        return this;
    }
}
