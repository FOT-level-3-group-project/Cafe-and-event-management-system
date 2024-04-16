package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ViewEventsRepository;
import com.kingsman.Kingsman.service.ViewEventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/events")
public class ViewEventsController {
    @Autowired
    private ViewEventsService viewEventsService;
    @Autowired
    private ViewEventsRepository viewEventsRepository;

   @GetMapping("/view-events")
    public List<Event> getAllEvents() {
        return viewEventsService.getAllEvents();
    }

    @DeleteMapping("/delete/{eventID}")
    public ResponseEntity<?> deleteEventByEventID(@PathVariable String eventID) {
        try {
            // Delegate deletion logic to service layer
            String deletedEventName = viewEventsService.deleteEventByEventID(eventID);
            return new ResponseEntity<>("Event with name " + deletedEventName + " has been deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete event: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    }

