package com.mvqa.cardmicroservice.repository;

import com.mvqa.cardmicroservice.model.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserCardRepository extends JpaRepository<UserCard, Long> {
}
