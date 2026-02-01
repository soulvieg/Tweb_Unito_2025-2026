package org.example.rdu.dtos;

public record CreatePostDTO(
        Integer userId,
        String title,
        String text
){}
