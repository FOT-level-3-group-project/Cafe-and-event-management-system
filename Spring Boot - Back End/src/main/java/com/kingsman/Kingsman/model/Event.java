package com.kingsman.Kingsman.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Time;
import java.time.LocalDate;

@Entity
public class Event {

    @Id
    @GeneratedValue
    private Integer eventID;
    private String eventName;
    private String eventType;

    private LocalDate eventDate;
    private Time startTime;
    private float duration;
    private float budget;
    private float ticketPrice;
    private String entertainer;
    private Integer ticketQuantity;
    private String eventDescription;

    public Integer getEventID() {
        return eventID;
    }

    public void setEventID(Integer eventID) {
        this.eventID = eventID;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public Time getStartTime() {
        return startTime;
    }

    public void setStartTime(Time eventTime) {
        this.startTime = eventTime;
    }

    public float getDuration() {
        return duration;
    }

    public void setDuration(float eventDuration) {
        this.duration = eventDuration;
    }

    public float getBudget() {
        return budget;
    }

    public void setBudget(float budget) {
        this.budget = budget;
    }

    public float getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(float ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public String getEntertainer() {
        return entertainer;
    }

    public void setEntertainer(String entertainer) {
        this.entertainer = entertainer;
    }

    public Integer getTicketQuantity() {
        return ticketQuantity;
    }

    public void setTicketQuantity(Integer capacity) {
        this.ticketQuantity = capacity;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }
}
