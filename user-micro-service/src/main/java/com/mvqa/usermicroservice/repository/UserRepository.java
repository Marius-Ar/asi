package com.mvqa.usermicroservice.repository;


import com.mvqa.usermicroservice.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    User findByMail(String mail);

    boolean existsUserByMailIsOrUsernameIs(String mail, String username);

    Optional<User> findById(UUID id);
}
