package com.mvqa.marketmicroservice.repository;

import com.mvqa.marketmicroservice.model.StoreListing;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StoreListingRepository extends CrudRepository<StoreListing, Long> {

    List<StoreListing> findAllBySellDateNull();
}
