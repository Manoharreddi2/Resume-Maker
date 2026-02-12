package com.resumemaker.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    private String userId;
    private PersonalInfo personalInfo;
    private String professionalSummary;
    private List<Education> education;
    private List<Project> projects;
    private List<String> skills;
    private List<String> achievements;
    private long updatedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PersonalInfo {
        private String fullName;
        private String email;
        private String phone;
        private String linkedin;
        private String github;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Education {
        private String degree;
        private String institution;
        private String year;
        private String cgpa;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Project {
        private String title;
        private String description;
        private String technologies;
    }
}
