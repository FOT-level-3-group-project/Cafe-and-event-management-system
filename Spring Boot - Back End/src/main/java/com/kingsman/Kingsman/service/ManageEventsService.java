package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ManageEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ManageEventsService {
    @Autowired
    private ManageEventsRepository manageEventsRepository;

    public List<Event> getAllEvents() {
        return manageEventsRepository.findAll();
    }

    @Transactional
    public String deleteEventByEventID(String eventID) {
        manageEventsRepository.deleteByEventID(eventID);
        return eventID;
    }

    public Event getEventById(String eventID) {
        return manageEventsRepository.findEventByEventID(eventID).orElse(null);
    }


    @Transactional
    public double getTotalRevenueForCurrentMonth() {
        LocalDate currentDate = LocalDate.now();
        LocalDate startOfMonth = currentDate.withDayOfMonth(1);
        LocalDate endOfMonth = currentDate.withDayOfMonth(currentDate.lengthOfMonth());

        List<Event> events = manageEventsRepository.findEventsByEventDateBetween(startOfMonth, endOfMonth);
        double totalRevenue = 0.0;

        for (Event event : events) {
            double revenue = event.getTicketPrice() * event.getTicketQuantity();
            System.out.println("Event " + event.getEventID() + " revenue: " + revenue);
            totalRevenue += revenue;
        }

        System.out.println("Total revenue for current month: " + totalRevenue);
        return totalRevenue;
    }

    public String updateEventByEventID(String eventID, Event event) {
        Event existingEvent = manageEventsRepository.findEventByEventID(eventID).orElse(null);
        if (existingEvent == null) {
            throw new IllegalArgumentException("Event with ID " + eventID + " does not exist");
        }
        existingEvent.setEventDate(event.getEventDate());
        existingEvent.setEventName(event.getEventName());
        existingEvent.setStartTime(event.getStartTime());
        existingEvent.setDuration(event.getDuration());
        existingEvent.setBudget(event.getBudget());
        existingEvent.setTicketPrice(event.getTicketPrice());
        existingEvent.setEntertainer(event.getEntertainer());
        existingEvent.setTicketQuantity(event.getTicketQuantity());
        existingEvent.setDescription(event.getDescription());
        manageEventsRepository.save(existingEvent);
        return eventID;
    }
}
