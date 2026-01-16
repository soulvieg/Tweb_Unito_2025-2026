package org.example.rdu.dtos;

import org.example.rdu.entities.UserType;

public record UserResponseDTO(
        Integer userId,
        String username,
        UserType userType
){}
