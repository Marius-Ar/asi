package com.mvqa.notificationmicroservice.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

  public final SocketHandler socketHandler;

  public WebSocketConfig(){
    this.socketHandler = new SocketHandler();
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(this.socketHandler, "/socket")
        .setAllowedOrigins("*");
  }

  @Bean
  WebSocketHandler socketHandler() {
    return new SocketHandler();
  }
}
