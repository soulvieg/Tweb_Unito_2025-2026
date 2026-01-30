package org.example.rdu.dtos;

import java.sql.Timestamp;

public record CommentDTO(
        Integer commentId,
        Integer postId,
        Integer userId,
        String text,
        Timestamp timestamp,
        boolean muted
){}
