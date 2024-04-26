package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Feedback;
import com.kingsman.Kingsman.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
public class FeedbackController {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping("/addFeedback")
    public ResponseEntity<String> addFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        try {
            // Create a new Feedback object
            Feedback feedback = new Feedback();
            feedback.setName(feedbackRequest.getName());
            feedback.setFeedback(feedbackRequest.getFeedback());
            feedback.setRate(feedbackRequest.getRate());

            // Save the feedback to the database
            feedbackRepository.save(feedback);

            return new ResponseEntity<>("Feedback added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error adding feedback: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //show feedback
    @GetMapping("/showFeedback")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        try {
            List<Feedback> feedbackList = feedbackRepository.findAll();
            return new ResponseEntity<>(feedbackList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
