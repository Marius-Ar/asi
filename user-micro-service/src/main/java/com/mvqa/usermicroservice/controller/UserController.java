package com.mvqa.usermicroservice.controller;


import com.mvqa.common.dto.UserDTO;
import com.mvqa.common.dto.UserDetailsDTO;
import com.mvqa.common.dto.UserRegisterDTO;
import com.mvqa.usermicroservice.mapper.UserMapper;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserMapper userMapper;
    private final UserService userService;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }
    @GetMapping
    public UserDetailsDTO getUserDetails(@CookieValue(name = "userId") Long userId) {
        return userMapper.toUserDetailsDTO(userService.findById(userId));
    }

    @PostMapping
    public User registerUser(@RequestBody UserRegisterDTO userRegisterDTO) {
        return userService.saveUser(userRegisterDTO);
    }

    @PostMapping("/login")
    public void login(@RequestBody UserDTO loginUser, HttpServletResponse httpServletResponse) {
        User user = userService.findByMail(loginUser.email());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur introuvable");
        }

        if (!loginUser.password().equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Mot de passe invalide");
        }

        Cookie cookie = new Cookie("userId", user.getId().toString());
        cookie.setPath("/");
        httpServletResponse.addCookie(cookie);
    }

    @PostMapping("/{id}/balance")
    public UserDTO updateUserBalance(@PathVariable Long id, @RequestBody Double amount) {
        return userMapper.toDto(userService.updateUserBalance(id, amount));
    }
}