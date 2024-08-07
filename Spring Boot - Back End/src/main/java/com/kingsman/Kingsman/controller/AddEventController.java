package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.AddEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AddEventController {

    @Autowired
    private AddEventRepository addEventRepository;

    @PostMapping("/add-event")
    public ResponseEntity<?> register(@RequestBody Event event) {
        // Check if there's already an event with the same name
        Event existingEventName = addEventRepository.findByEventName(event.getEventName());
        if (existingEventName != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An event with the same name already exists");
        }

        // Check if there's already an event with the same ID
        Optional<Event> existingEventID = addEventRepository.findById(event.getEventID());
        if (existingEventID.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An event with the same ID already exists");
        }

        // Check if there's already an event on the same day
        Event existingEventOnSameDay = addEventRepository.findByEventDate(event.getEventDate());
        if (existingEventOnSameDay != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An event already exists on the same day");
        }

        // Save the event if there are no conflicts
        addEventRepository.save(event);

        return ResponseEntity.ok("Event added successfully");
    }

}
