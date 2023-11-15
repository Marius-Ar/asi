package com.mvqa.cardmicroservice.repository;

import com.mvqa.cardmicroservice.model.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface UserCardRepository extends JpaRepository<UserCard, Long> {
    List<UserCard> findByUserId(UUID userId);

}
