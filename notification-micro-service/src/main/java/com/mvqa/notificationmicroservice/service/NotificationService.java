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
        if (notification.split(";").length == 3) {
            String sessionId = notification.split(";")[0];
            String type = notification.split(";")[1];
            String message = notification.split(";")[2];
            System.out.println("Sending message to session " + sessionId + " : " + type + ';' + message);
            webSocketService.sendMessageToSession(sessionId, type + ';' + message);
        } else {
            webSocketService.broadcastToAllSessions(notification);
        }
    }
}
