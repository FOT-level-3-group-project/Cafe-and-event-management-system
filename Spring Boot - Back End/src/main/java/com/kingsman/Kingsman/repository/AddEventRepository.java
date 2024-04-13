package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddEventRepository extends JpaRepository<Event, Integer>{
    Event findByEventName(String eventName);
    Event findByEventDate(String eventDate);
    Event save(Event event);
}
