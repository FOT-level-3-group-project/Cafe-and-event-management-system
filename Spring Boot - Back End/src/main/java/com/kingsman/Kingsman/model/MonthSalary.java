package com.kingsman.Kingsman.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.YearMonth;
import java.util.Date;

@Entity
public class MonthSalary {
    @Id
    @GeneratedValue
    private Long id;
    private String empName;
//    private YearMonth month;
    private Date month;
    private Float workedHours;
    private Float payPerHours;
    private Float totalHourPayment;
    private Float OTHours;
    private Float payPerOvertimeHour;
    private Float totalOvertimePayment;
    private String bonusType;
    private Float bonus;
    private String deductionType;
    private Float deduction;
    private Float grossPayment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

//    public YearMonth getMonth() {
//        return month;
//    }
//
//    public void setMonth(YearMonth month) {
//        this.month = month;
//    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public Float getWorkedHours() {
        return workedHours;
    }

    public void setWorkedHours(Float workedHours) {
        this.workedHours = workedHours;
    }

    public Float getPayPerHour() {
        return payPerHours;
    }

    public void setPayPerHour(Float payPerHour) {
        this.payPerHours = payPerHour;
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

    public Float getPayPerOvertimeHour() {
        return payPerOvertimeHour;
    }

    public void setPayPerOvertimeHour(Float payPerOvertimeHour) {
        this.payPerOvertimeHour = payPerOvertimeHour;
    }

    public Float getTotalOvertimePayment() {
        return totalOvertimePayment;
    }

    public void setTotalOvertimePayment(Float totalOvertimePayment) {
        this.totalOvertimePayment = totalOvertimePayment;
    }

    public String getBonusType() {
        return bonusType;
    }

    public void setBonusType(String bonusType) {
        this.bonusType = bonusType;
    }

    public Float getBonus() {
        return bonus;
    }

    public void setBonus(Float bonus) {
        this.bonus = bonus;
    }

    public String getDeductionType() {
        return deductionType;
    }

    public void setDeductionType(String deductionType) {
        this.deductionType = deductionType;
    }

    public Float getDeduction() {
        return deduction;
    }

    public void setDeduction(Float deduction) {
        this.deduction = deduction;
    }

    public Float getGrossPayment() {
        return grossPayment;
    }

    public void setGrossPayment(Float grossPayment) {
        this.grossPayment = grossPayment;
    }
}