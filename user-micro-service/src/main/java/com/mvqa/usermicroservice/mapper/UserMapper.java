package com.mvqa.usermicroservice.mapper;

import com.mvqa.common.dto.UserChatDTO;
import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserDetailsDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper {

    public User toEntity(UserRegisterDTO userRegisterDTO) {
        return new User(
                userRegisterDTO.getUsername(),
                userRegisterDTO.getEmail(),
                userRegisterDTO.getPassword()
        );
    }

    public UserDTO toDto(User user) {
        return new UserDTO(user.getMail(), null);
    }


    public Iterable<UserChatDTO> usersToChatDto(Iterable<User> users) {
        List<UserChatDTO> userDtos = new ArrayList<>();
        for (User user : users) {
            UserChatDTO userChatDTO = new UserChatDTO(user.getId(), user.getUsername());
            userDtos.add(userChatDTO);
        }
        return userDtos;
    }


    public UserDetailsDTO toUserDetailsDTO(User user) {
        return new UserDetailsDTO(
                user.getUsername(),
                user.getBalance()
        );
    }
}
