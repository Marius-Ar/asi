package com.mvqa.common.queue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class QueueClient {
    private final JmsTemplate jmsTemplate;

    private static final String QUEUE_KEY = "start-messaging.queue.name";

    private String queue;

    private final Environment environment;

    @Autowired
    public QueueClient(JmsTemplate jmsTemplate, Environment environment) {
        this.jmsTemplate = jmsTemplate;
        this.environment = environment;
    }
    @PostConstruct
    public void init() {
        queue = environment.getProperty(QUEUE_KEY);
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public void sendMessage(Object object) {

        // Send a message with a POJO - the template reuse the message converter
        System.out.println("Sending a message.");
        jmsTemplate.convertAndSend(queue, object);
    }
}
