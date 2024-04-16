package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ManageEventsRepository;
import com.kingsman.Kingsman.service.ManageEventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/events")
public class ManageEventsController {
    @Autowired
    private ManageEventsService viewEventsService;
    @Autowired
    private ManageEventsRepository viewEventsRepository;

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

