package com.mvqa.cardmicroservice.repository;

import com.mvqa.cardmicroservice.model.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends CrudRepository<Card, Long>, PagingAndSortingRepository<Card, Long> {

    List<Card> findByUserId(Long id);
    List<Card> findByUserIdAndEnergyIsGreaterThan(Long id,Double energy);
    List<Card> findByName(String name);
}
