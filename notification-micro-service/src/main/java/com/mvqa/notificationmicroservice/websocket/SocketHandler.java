package com.mvqa.notificationmicroservice.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.*;

import java.util.concurrent.ConcurrentHashMap;

@Slf4j
public class SocketHandler implements WebSocketHandler {

    // Stocke les sessions actives.
    private final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("Connection established on session {}", session.getId());
        // Ajouter la session à la liste des sessions actives.
        sessions.put(session.getId(), session);
        session.sendMessage(new TextMessage("init_session" + ';' + session.getId()));
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String messageString = (String) message.getPayload();
        log.info("Message received on session {}: {}", session.getId(), messageString);
        // Répondre au message reçu.
        session.sendMessage(new TextMessage("Hello from the server!"));
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        log.error("Transport error on session {}", session.getId(), exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        log.info("Connection closed on session {}", session.getId());
        // Retirer la session de la liste des sessions actives.
        sessions.remove(session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

    // Envoyer un message à tous les clients connectés.
    public void broadcast(String message) {
        TextMessage textMessage = new TextMessage(message);
        sessions.forEach((id, session) -> {
            try {
                session.sendMessage(textMessage);
            } catch (Exception e) {
                log.error("Failed to send message to session {}", id, e);
            }
        });
    }

    // Envoyer un message à un client spécifique.
    public void sendMessageToSession(String sessionId, String message) {
        WebSocketSession session = sessions.get(sessionId);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                log.error("Failed to send message to session {}", sessionId, e);
            }
        }
    }
}
