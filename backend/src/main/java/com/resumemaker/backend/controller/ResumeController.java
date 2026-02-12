package com.resumemaker.backend.controller;

import com.resumemaker.backend.model.Resume;
import com.resumemaker.backend.service.ResumeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/save")
    public ResponseEntity<?> saveResume(@RequestBody Resume resume, HttpServletRequest request) {
        try {
            String uid = (String) request.getAttribute("uid");
            resume.setUserId(uid);
            Resume savedResume = resumeService.saveResume(resume);
            return ResponseEntity.ok(savedResume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getResume(@PathVariable String userId, HttpServletRequest request) {
        try {
            String uid = (String) request.getAttribute("uid");
            if (!uid.equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("error", "Unauthorized access"));
            }
            Resume resume = resumeService.getResume(userId);
            if (resume == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Resume not found"));
            }
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateResume(@RequestBody Resume resume, HttpServletRequest request) {
        try {
            String uid = (String) request.getAttribute("uid");
            resume.setUserId(uid);
            Resume updatedResume = resumeService.updateResume(resume);
            return ResponseEntity.ok(updatedResume);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteResume(HttpServletRequest request) {
        try {
            String uid = (String) request.getAttribute("uid");
            resumeService.deleteResume(uid);
            return ResponseEntity.ok(Map.of("message", "Resume deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
