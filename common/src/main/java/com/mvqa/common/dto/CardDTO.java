package com.mvqa.common.dto;

import java.util.UUID;

public record CardDTO(
        Long id,
        String description,
        String name,
        String familyName,
        Double hp,
        Double attack,
        Double energy,
        Double defense,
        Double actualValue,
        String imageUrl
) {
}
