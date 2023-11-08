package com.mvqa.usermicroservice.repository;


import com.mvqa.usermicroservice.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    User findByMail(String mail);
    boolean existsUserByMailIsOrUsernameIs(String mail, String username);
}
