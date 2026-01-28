package org.example.rdu.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.example.rdu.entities.UserType;

@Getter
@AllArgsConstructor
public class SessionData {
    private final Integer userId;
    private final String username;
    private final UserType role;
    private final String message;
}


