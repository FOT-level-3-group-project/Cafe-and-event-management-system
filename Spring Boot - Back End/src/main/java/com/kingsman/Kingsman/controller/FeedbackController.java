package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Feedback;
import com.kingsman.Kingsman.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class FeedbackController {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping("/feedback")
    public Feedback newFeedback(@RequestBody Feedback newFeedback) {
        return feedbackRepository.save(newFeedback);
    }

    @GetMapping("/feedbackView")
    public List<Feedback> getUsers() {
        return feedbackRepository.findAll();
    }
}
