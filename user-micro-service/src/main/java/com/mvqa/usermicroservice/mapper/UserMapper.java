package com.mvqa.usermicroservice.mapper;

import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserDetailsDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRegisterDTO userRegisterDTO) {
        return new User(
                userRegisterDTO.username(),
                userRegisterDTO.email(),
                userRegisterDTO.password()
        );
    }

    public UserDTO toDto(User user) {
        return new UserDTO(user.getMail(), null);
    }

    public UserDetailsDTO toUserDetailsDTO(User user) {
        return new UserDetailsDTO(
                user.getUsername(),
                user.getBalance()
        );
    }
}
