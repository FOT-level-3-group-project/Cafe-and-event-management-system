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
    public ResponseEntity<?> deleteEventByEventID(@PathVariable Integer eventID) {
        try {
            Optional<Event> eventOptional = viewEventsRepository.findEventByEventID(eventID); //search employee by id
            if (!eventOptional.isPresent()) {
                return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
            }

            String eventName = eventOptional.get().getEventName();
            // Delete the employee
            viewEventsRepository.deleteEventByEventID(eventID);
            return new ResponseEntity<>("Event with name " + eventName + " has been deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete event!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
