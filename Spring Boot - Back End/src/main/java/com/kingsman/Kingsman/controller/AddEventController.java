package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ManageEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AddEventController {

    @Autowired
    private ManageEventsRepository manageEventsRepository;

    @PostMapping("/add-event")
    public ResponseEntity<?> register(@RequestBody Event event) {
        // Check if there's already an event with the same name
        Event existingEventName = manageEventsRepository.findByEventName(event.getEventName());
        if (existingEventName != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An event with the same name already exists");
        }


        // Check if there's already an event on the same day
        Event existingEventOnSameDay = manageEventsRepository.findByEventDate(event.getEventDate());
        if (existingEventOnSameDay != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An event already exists on the same day");
        }

        System.out.println(event.getEventID());
        // Save the event if there are no conflicts
        manageEventsRepository.save(event);

        return ResponseEntity.ok("Event added successfully");
    }
}
