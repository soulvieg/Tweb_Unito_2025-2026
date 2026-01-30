package org.example.rdu.dtos;

public record ReportDTO(
        Integer reportId,
        String reason,
        Integer commentId,
        Integer reporterId
){}
