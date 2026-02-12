package com.resumemaker.backend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.resumemaker.backend.model.Resume;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ResumeService {

    private static final String COLLECTION_NAME = "resumes";

    @Autowired
    private Firestore firestore;

    public Resume saveResume(Resume resume) throws ExecutionException, InterruptedException {
        resume.setUpdatedAt(System.currentTimeMillis());
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(resume.getUserId());
        docRef.set(resume).get();
        return resume;
    }

    public Resume getResume(String userId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(userId);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Resume.class);
        }
        return null;
    }

    public Resume updateResume(Resume resume) throws ExecutionException, InterruptedException {
        resume.setUpdatedAt(System.currentTimeMillis());
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(resume.getUserId());

        ApiFuture<DocumentSnapshot> future = docRef.get();
        if (!future.get().exists()) {
            throw new RuntimeException("Resume not found for user: " + resume.getUserId());
        }

        docRef.set(resume).get();
        return resume;
    }

    public void deleteResume(String userId) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(userId);
        docRef.delete().get();
    }
}
