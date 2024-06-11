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
    private ManageEventsService manageEventsService;
    @Autowired
    private ManageEventsRepository manageEventsRepository;

    @GetMapping("/view-events")
    public List<Event> getAllEvents() {
        return manageEventsService.getAllEvents();
    }

    @DeleteMapping("/delete/{eventID}")
    public ResponseEntity<?> deleteEventByEventID(@PathVariable String eventID) {
        try {
            String deletedEventName = manageEventsService.deleteEventByEventID(eventID);
            return new ResponseEntity<>("Event with name " + deletedEventName + " has been deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete event: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("get/{eventID}")
    public ResponseEntity<?> getEventByEventID(@PathVariable String eventID) {
        try {
            Event event = manageEventsService.getEventById(eventID);
            return new ResponseEntity<>(event, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to retrieve event: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{eventID}")
    public ResponseEntity<?> updateEventByEventID(@PathVariable String eventID, @RequestBody Event event) {
        try {
            // Delegate update logic to service layer
            String updatedEventName = manageEventsService.updateEventByEventID(eventID, event);
            return new ResponseEntity<>("Event with name " + updatedEventName + " has been updated", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update event: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
