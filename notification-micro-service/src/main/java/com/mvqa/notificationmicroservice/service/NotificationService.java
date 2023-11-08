package com.mvqa.notificationmicroservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final WebSocketService webSocketService;
    @Autowired
    public NotificationService(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }

    @JmsListener(destination = "${spring-messaging.queue.name}")
    public void onNotificationInQueue(String notification) {
        webSocketService.broadcastToAllSessions(notification);
    }
}
