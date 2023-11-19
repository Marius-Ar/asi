package com.mvqa.usermicroservice.service;

import com.mvqa.common.dto.UserRegistrationWithNotificationDTO;
import com.mvqa.usermicroservice.mapper.UserMapper;
import com.mvqa.usermicroservice.model.User;
import com.mvqa.usermicroservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserAsyncProcess {

    private final JmsTemplate jmsTemplate;
    private UserRepository userRepository;
    @Value("${NOTIFICATION_QUEUE_NAME}")
    private String notificationQueueName;

    public UserAsyncProcess(UserRepository userRepository, JmsTemplate jmsTemplate) {
        this.userRepository = userRepository;
        this.jmsTemplate = jmsTemplate;
    }

    @JmsListener(destination = "userRegistrationQueue")
    public void processUserRegistration(UserRegistrationWithNotificationDTO userRegistrationWithNotificationDTO) {
        User user = new UserMapper().toEntity(userRegistrationWithNotificationDTO.getUserRegisterDTO());
        userRepository.save(user);
        sendNotification(userRegistrationWithNotificationDTO.getNotificationSessionId().toString(), "success", "Votre compte a été créé avec succès");
    }

    public void sendNotification(String userId, String type, String message) {
        String formattedMessage = String.join(";", userId, type, message);
        System.out.println("Sending a notification message: " + formattedMessage);
        jmsTemplate.convertAndSend(notificationQueueName, formattedMessage);
    }
}


