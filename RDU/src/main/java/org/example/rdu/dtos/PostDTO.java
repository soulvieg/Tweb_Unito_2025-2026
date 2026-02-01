package org.example.rdu.dtos;

import java.sql.Timestamp;

public record PostDTO(
        Integer postId,
        Integer userId,
        String title,
        String text,
        Timestamp creationDate,
        Integer count_replies
){}


