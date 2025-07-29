package com.nayan.potholereporter.repository;

import com.nayan.potholereporter.model.PotholeReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PotholeReportRepository extends JpaRepository<PotholeReport, Long> {
}
