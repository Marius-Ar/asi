package com.mvqa.notificationmicroservice.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.*;

@Slf4j
public class SocketHandler implements WebSocketHandler {

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Connection established on session {}", session.getId());
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String messageString = (String) message.getPayload();
        log.info("Message received on session {}: {}", session.getId(), messageString);
        session.sendMessage(new TextMessage("Hello from the server!"));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("Transport error on session {}", session.getId(), exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("Connection closed on session {}", session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
