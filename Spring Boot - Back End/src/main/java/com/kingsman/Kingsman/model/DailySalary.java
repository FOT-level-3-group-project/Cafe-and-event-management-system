package com.kingsman.Kingsman.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class DailySalary {

    @Id
    @GeneratedValue
    private Long id;
    private String EmpId;
    private String EmpName;
    private String date;
    private Float workedHours;
    private Float payPerHours;
    private Float totalHourPayment;
    private Float OTHours;
    private Float payPerOTHours;
    private Float totalOTHourPayment;
    private Float grossPayment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpId() {
        return EmpId;
    }

    public void setEmpId(String empId) {
        EmpId = empId;
    }

    public String getEmpName() {
        return EmpName;
    }

    public void setEmpName(String empName) {
        EmpName = empName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Float getWorkedHours() {
        return workedHours;
    }

    public void setWorkedHours(Float workedHours) {
        this.workedHours = workedHours;
    }

    public Float getPayPerHours() {
        return payPerHours;
    }

    public void setPayPerHours(Float payPerHours) {
        this.payPerHours = payPerHours;
    }

    public Float getTotalHourPayment() {
        return totalHourPayment;
    }

    public void setTotalHourPayment(Float totalHourPayment) {
        this.totalHourPayment = totalHourPayment;
    }

    public Float getOTHours() {
        return OTHours;
    }

    public void setOTHours(Float OTHours) {
        this.OTHours = OTHours;
    }

    public Float getPayPerOTHours() {
        return payPerOTHours;
    }

    public void setPayPerOTHours(Float payPerOTHours) {
        this.payPerOTHours = payPerOTHours;
    }

    public Float getTotalOTHourPayment() {
        return totalOTHourPayment;
    }

    public void setTotalOTHourPayment(Float totalOTHourPayment) {
        this.totalOTHourPayment = totalOTHourPayment;
    }

    public Float getGrossPayment() {
        return grossPayment;
    }

    public void setGrossPayment(Float grossPayment) {
        this.grossPayment = grossPayment;
    }
}
