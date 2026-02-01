package org.example.rdu.dtos;

import java.sql.Timestamp;

public record NewsDTO(
        Integer newsId,
        Integer categoryId,
        String title,
        String description,
        String content,
        String img,
        String src,
        String location,
        Timestamp published_at
){}

