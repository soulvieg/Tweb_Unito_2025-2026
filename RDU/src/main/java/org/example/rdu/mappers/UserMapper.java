package org.example.rdu.mappers;

import org.example.rdu.dtos.UserResponseDTO;
import org.example.rdu.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponseDTO toDto(User user){
        return new UserResponseDTO(
                user.getUserId(),
                user.getUsername(),
                user.getUserType()
                );
    }
}
