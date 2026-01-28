package org.example.rdu.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reportId", nullable = false)
    @Getter
    @Setter
    private Integer reportId;


    public Report(){}
}
