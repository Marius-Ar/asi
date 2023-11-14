package com.mvqa.common.web;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    public LoginInterceptor() {
        super();
    }

    private List<String> uriList = List.of("/card/user","/register","/error","/user/register","/user/login","/login", "/css/.*","/js/.*");
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        Cookie[] cookies = request.getCookies();
         if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("userId")) {
                    return true;
                }
            }
        }
        boolean match = uriList.stream().anyMatch(uri -> request.getRequestURI().matches(uri));
        if(!match){
            response.setStatus(403);
            return false;
        }
        return true;
    }
}
