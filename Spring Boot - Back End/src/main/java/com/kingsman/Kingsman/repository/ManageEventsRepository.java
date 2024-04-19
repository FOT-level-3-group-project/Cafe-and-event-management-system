package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ManageEventsRepository extends JpaRepository<Event, String> {
    Optional<Event> findEventByEventID(String eventID);
    void deleteByEventID(String eventID);
}
