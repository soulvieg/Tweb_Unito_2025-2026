package org.example.rdu.dtos;

public record CreateCommentDTO(
        Integer postId,
        Integer userId,
        String text
){}
