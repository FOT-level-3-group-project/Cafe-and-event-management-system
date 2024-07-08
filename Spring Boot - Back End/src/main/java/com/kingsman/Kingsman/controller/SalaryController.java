package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.service.MonthSalaryService;
import com.kingsman.Kingsman.model.MonthSalary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salary")
public class SalaryController {

    @Autowired
    private MonthSalaryService monthSalaryService;

    @PostMapping("/calculateMonthlySalaries")
    public String calculateMonthlySalaries() {
        monthSalaryService.calculateMonthlySalaries();
        return "Monthly salaries calculated and saved successfully.";
    }

    @GetMapping("/getAllMonthSalaries")
    public List<MonthSalary> getAllMonthSalaries() {
        return monthSalaryService.getAllMonthSalaries();
    }

    @GetMapping("/getThisMonthSalaries")
    public List<MonthSalary> getThisMonthSalaries() {
        return monthSalaryService.getThisMonthSalaries();
    }

    // Endpoint to get total gross payment for the current month
    @GetMapping("/total-salary-for-current-month")
    public Float getTotalGrossPaymentForCurrentMonth() {
        return monthSalaryService.getTotalGrossPaymentForCurrentMonth();
    }

    // Endpoint to get total gross payment for the current year
    @GetMapping("/annual-total-salary")
    public Float getTotalGrossPaymentForCurrentYear() {
        return monthSalaryService.getTotalGrossPaymentForCurrentYear();
    }
}
