package com.mvqa.usermicroservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service

public class HttpClient {

    @Value("${services.API_CARD}")
    String cardApiUri;
}
