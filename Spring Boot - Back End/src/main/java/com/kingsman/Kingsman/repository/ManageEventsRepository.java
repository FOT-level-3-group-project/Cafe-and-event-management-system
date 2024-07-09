package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ManageEventsRepository extends JpaRepository<Event, String> {
    // Find event by eventID
    Optional<Event> findEventByEventID(String eventID);

    // delete event by eventID
    void deleteByEventID(String eventID);

    // Find all events for current month
    @Query("SELECT SUM(e.ticketPrice * e.soldTicketQuantity) FROM Event e WHERE MONTH(e.eventDate) = MONTH(CURRENT_DATE) AND YEAR(e.eventDate) = YEAR(CURRENT_DATE)")
    Double findTotalRevenueForCurrentMonth();

    // Find Total revenue of events for current year
    @Query("SELECT SUM(e.ticketPrice * e.soldTicketQuantity) FROM Event e WHERE YEAR(e.eventDate) = YEAR(CURRENT_DATE)")
    Double findTotalRevenueForCurrentYear();

    //  Find Total budget of events for current month
    @Query("SELECT SUM(o.budget) FROM Event o WHERE MONTH(o.eventDate) = MONTH(CURRENT_DATE) AND YEAR(o.eventDate) = YEAR(CURRENT_DATE)")
    Double findTotalEventBudgetForCurrentMonth();

    // Find Total budget of events for current year
    @Query("SELECT SUM(o.budget) FROM Event o WHERE YEAR(o.eventDate) = YEAR(CURRENT_DATE)")
    Double findTotalEventBudgetForCurrentYear();
}
