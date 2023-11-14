package com.mvqa.cardmicroservice.repository;

import com.mvqa.cardmicroservice.model.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CardRepository extends CrudRepository<Card, Long>, PagingAndSortingRepository<Card, Long> {

/*    List<Card> findByUserId(UUID id);
    List<Card> findByUserIdAndEnergyIsGreaterThan(UUID id, Double energy);*/
    List<Card> findByName(String name);
}
