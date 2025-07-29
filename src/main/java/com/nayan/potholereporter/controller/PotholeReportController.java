package com.nayan.potholereporter.controller;

import com.nayan.potholereporter.model.PotholeReport;
import com.nayan.potholereporter.repository.PotholeReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/potholes")
@CrossOrigin(origins = "*") // Allow frontend access
public class PotholeReportController {

    @Autowired
    private PotholeReportRepository repository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @GetMapping("/test")
    public String test() {
        return "✅ Pothole API is running!";
    }

    @PostMapping("/report")
    public String reportPothole(
            @RequestParam("latitude") String latitude,
            @RequestParam("longitude") String longitude,
            @RequestParam("address") String address,
            @RequestParam("riskLevel") String riskLevel,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            // Create upload folder if it doesn't exist
            File uploadFolder = new File(UPLOAD_DIR);
            if (!uploadFolder.exists()) uploadFolder.mkdirs();

            // Unique filename with timestamp
            String filename = "pothole_" + Instant.now().getEpochSecond() + ".jpg";
            String filePath = UPLOAD_DIR + filename;

            // Save image
            File dest = new File(filePath);
            image.transferTo(dest);

            // Save report to DB
            PotholeReport report = new PotholeReport();
            report.setLatitude(latitude);
            report.setLongitude(longitude);
            report.setAddress(address);
            report.setRiskLevel(riskLevel);
            report.setDescription(description);
            report.setImagePath(filePath);

            repository.save(report);

            return "✅ Pothole report saved successfully!";
        } catch (IOException e) {
            return "❌ Error saving image: " + e.getMessage();
        }
    }

    // ➕ View All Reports (Test GET)
    @GetMapping("/all")
    public List<PotholeReport> getAllReports() {
        return repository.findAll();
    }
}
