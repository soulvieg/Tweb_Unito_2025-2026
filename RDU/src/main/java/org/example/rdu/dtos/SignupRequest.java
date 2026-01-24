package org.example.rdu.dtos;

import org.example.rdu.entities.UserType;

public record SignupRequest(
    String username,
    String password
) {}
