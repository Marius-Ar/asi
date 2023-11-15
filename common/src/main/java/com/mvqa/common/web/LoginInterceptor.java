package com.mvqa.common.web;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    private final List<String> uriList = List.of("/user", "/card/user", "/card/user/register", "/register", "/error", "/user/register", "/user/login", "/login", "/css/.*", "/js/.*");

    public LoginInterceptor() {
        super();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("userId")) {
                    return true;
                }
            }
        }
        boolean match = uriList.stream().anyMatch(uri -> request.getRequestURI().contains(uri));
        if (!match) {
            response.setStatus(403);
            return false;
        }
        return true;
    }
}
