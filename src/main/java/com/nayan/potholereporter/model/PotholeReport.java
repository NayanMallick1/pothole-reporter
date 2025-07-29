package com.nayan.potholereporter.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pothole_report") // Ensures correct table name
@Data
public class PotholeReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String latitude;
    private String longitude;
    private String address;
    private String riskLevel;
    private String description;
    private String imagePath;
}
