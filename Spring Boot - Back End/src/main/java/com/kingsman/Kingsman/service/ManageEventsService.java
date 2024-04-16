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

    @Transactional
    public String deleteEventByEventID(String eventID) {
        viewEventsRepository.deleteByEventID(eventID);
        return eventID;
    }
}
