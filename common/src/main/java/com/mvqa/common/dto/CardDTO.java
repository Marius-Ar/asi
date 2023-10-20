package com.mvqa.common.dto;

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
        String imageUrl,
        Long userId
) {
}
