package org.example.rdu.mappers;

import org.example.rdu.dtos.CreateReportDTO;
import org.example.rdu.dtos.ReportDTO;
import org.example.rdu.entities.Comment;
import org.example.rdu.entities.Report;
import org.example.rdu.entities.User;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class ReportMapper {
    public ReportDTO toDTO(Report report) {
        if (report == null) {
            return null;
        }

        Integer commentId = (report.getComment() != null) ? report.getComment().getCommentId() : null;
        Integer reporterId = (report.getReporter() != null) ? report.getReporter().getUserId() : null;

        return new ReportDTO(
                report.getReportId(),
                report.getReason(),
                commentId,
                reporterId
        );
    }

    public Report toEntity(CreateReportDTO reportDTO, Comment comment, User reporter) {
        if (reportDTO == null) {
            return null;
        }
        Report report = new Report();
        report.setComment(comment);
        report.setReporter(reporter);
        report.setReason(reportDTO.reason());
        report.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return report;
}
}
