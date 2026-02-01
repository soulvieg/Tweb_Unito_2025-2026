package org.example.rdu.dtos;

public record CreateNewsDTO(
        Integer categoryId,
        String title,
        String description,
        String content,
        String img,
        String src,
        String location
){}
