package com.mvqa.usermicroservice.service;


import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.mapper.UserMapper;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }
    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    public User saveUser(UserRegisterDTO userRegisterDTO) {
        boolean existingUser = userRepository.existsUserByMailIsOrUsernameIs(userRegisterDTO.email(), userRegisterDTO.username());
        if (existingUser) {
            throw new IllegalArgumentException("Un utilisateur avec le même nom d'utilisateur existe déjà");
        }

        if (!userRegisterDTO.password().equals(userRegisterDTO.passwordConfirmation())) {
            throw new IllegalArgumentException("Les mots de passe ne correspondent pas");
        }

        return userRepository.save(userMapper.toEntity(userRegisterDTO));
    }

    public User findByMail(String mail) {
        System.out.println("hgghjjgh"+mail);
        System.out.println(userRepository.findByMail(mail));
        return userRepository.findByMail(mail);
    }

    public User updateUserBalance(Long userId, Double amount) throws IllegalArgumentException {
        User user = findById(userId);

        double newBalance = user.getBalance() + amount;
        if (newBalance < 0) {
            throw new IllegalArgumentException("L'acheteur n'a pas assez de fric");
        }

        user.setBalance(newBalance);
        return userRepository.save(user);
    }
}