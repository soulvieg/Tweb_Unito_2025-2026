package org.example.rdu.mappers;

import org.example.rdu.dtos.ReportDTO;
import org.example.rdu.entities.Report;

public class ReportMapper {
    public ReportDTO toDTO(Report report) {
        if (report == null) {
            return null;
        }
        return new ReportDTO(
                report.getReportId(),
                report.getReason(),
                report.getCommentId(),
                report.getReporterId()
        );
    }

    public Report toEntity(ReportDTO reportDTO) {
        if (reportDTO == null) {
            return null;
        }
        Report report = new Report();
        report.setReportId(reportDTO.reportId());
        report.setReason(reportDTO.reason());
        report.setCommentId(reportDTO.commentId());
        report.setReporterId(reportDTO.reporterId());

        // createdAt is missing in DTO, handled by DB or Service usually
        // report.setCreatedAt(...);

        return report;
}
}
