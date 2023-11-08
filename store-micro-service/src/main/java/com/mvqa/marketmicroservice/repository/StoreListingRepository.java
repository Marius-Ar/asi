package com.mvqa.marketmicroservice.repository;

import com.mvqa.marketmicroservice.model.StoreListing;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreListingRepository extends CrudRepository<StoreListing, Long> {

    List<StoreListing> findAllBySellDateNull();
}
