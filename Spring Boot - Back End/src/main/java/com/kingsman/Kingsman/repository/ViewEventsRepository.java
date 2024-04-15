package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ViewEventsRepository extends JpaRepository<Event, Integer> {
    Optional<Event> findEventByEventID(Integer eventID);
    void deleteEventByEventID(Integer eventID);
}
