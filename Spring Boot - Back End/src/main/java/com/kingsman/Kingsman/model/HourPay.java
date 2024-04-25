package com.kingsman.Kingsman.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;


@Entity
public class HourPay {
    @GeneratedValue
    @Id
    private Long id;
    private String position;
    private Float payPerHour;
    private Float payPerOtHour;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Float getPayPerHour() {
        return payPerHour;
    }

    public void setPayPerHour(Float payPerHour) {
        this.payPerHour = payPerHour;
    }

    public Float getPayPerOtHour() {
        return payPerOtHour;
    }

    public void setPayPerOtHour(Float payPerOtHour) {
        this.payPerOtHour = payPerOtHour;
    }
}
