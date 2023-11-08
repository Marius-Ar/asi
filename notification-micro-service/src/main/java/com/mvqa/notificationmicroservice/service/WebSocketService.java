package com.mvqa.notificationmicroservice.service;

import com.mvqa.notificationmicroservice.websocket.SocketHandler;
import com.mvqa.notificationmicroservice.websocket.WebSocketConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    private final SocketHandler socketHandler;

    @Autowired
    public WebSocketService(WebSocketConfig webSocketConfig) {
        this.socketHandler = webSocketConfig.socketHandler;
    }

    public void broadcastToAllSessions(String message) {
        socketHandler.broadcast(message);
    }

    public void sendMessageToSession(String sessionId, String message) {
        socketHandler.sendMessageToSession(sessionId, message);
    }
}
