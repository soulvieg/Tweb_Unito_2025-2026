package org.example.rdu.repositories;

import org.example.rdu.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {}
