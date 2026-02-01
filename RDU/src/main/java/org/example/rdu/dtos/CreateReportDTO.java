package org.example.rdu.dtos;

public record CreateReportDTO(
    Integer commentId,
    Integer reporterId,
    String reason
){}
