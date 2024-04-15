package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ViewEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewEventsService {
    @Autowired
    private ViewEventsRepository viewEventsRepository;

    public List<Event> getAllEvents() {
        return viewEventsRepository.findAll();
    }
}
