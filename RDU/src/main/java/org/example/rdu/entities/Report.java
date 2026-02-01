package org.example.rdu.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name="reports")
@NoArgsConstructor
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reportId", nullable = false)
    private Integer reportId;

    private String reason;

    private Timestamp createdAt;

    @ManyToOne
    @JoinColumn(name="commentId", nullable=false)
    private Comment comment;

    @ManyToOne
    @JoinColumn(name="reporterId", nullable=false)
    private User reporter;

}
