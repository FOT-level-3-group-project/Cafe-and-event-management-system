package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ManageEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ManageEventsService {
    @Autowired
    private ManageEventsRepository viewEventsRepository;

    public List<Event> getAllEvents() {
        return viewEventsRepository.findAll();
    }

    //delete event
    @Transactional
    public String deleteEventByEventID(String eventID) {
        viewEventsRepository.deleteByEventID(eventID);
        return eventID;
    }

    //display event details
    public Event getEventById(String eventID) {
        return viewEventsRepository.findEventByEventID(eventID).orElse(null);
    }

    //update event
    public String updateEventByEventID(String eventID, Event event) {
        Event existingEvent = viewEventsRepository.findEventByEventID(eventID).orElse(null);
        if (existingEvent == null) {
            throw new IllegalArgumentException("Event with ID " + eventID + " does not exist");
        }
        existingEvent.setEventDate(event.getEventDate());
        existingEvent.setStartTime(event.getStartTime());
        existingEvent.setDuration(event.getDuration());
        existingEvent.setBudget(event.getBudget());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setEntertainer(event.getEntertainer());
        existingEvent.setTicketQuantity(event.getTicketQuantity());
        existingEvent.setDescription(event.getDescription());
        viewEventsRepository.save(existingEvent);
        return existingEvent.getEventName();
    }
}
