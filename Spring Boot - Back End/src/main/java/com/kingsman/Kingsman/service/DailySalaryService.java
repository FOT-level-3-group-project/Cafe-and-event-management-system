package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Attendance;
import com.kingsman.Kingsman.model.DailySalary;
import com.kingsman.Kingsman.model.HourPayment;
import com.kingsman.Kingsman.repository.AttendanceRepository;
import com.kingsman.Kingsman.repository.DailySalaryRepository;
import com.kingsman.Kingsman.repository.HourPaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class DailySalaryService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private HourPaymentRepository hourPaymentRepository;

    @Autowired
    private DailySalaryRepository dailySalaryRepository;

    public DailySalary calculateDailySalary(String employeeId, String date) {
        DailySalary dailySalary = new DailySalary();
        dailySalary.setEmpId(employeeId);
        dailySalary.setDate(date);

        // Convert dateString to LocalDate
        LocalDate dateObj = LocalDate.parse(date);

        Attendance attendance = attendanceRepository.findByEmpIdAndDate(employeeId, dateObj);
        if (attendance == null) {
            throw new RuntimeException("Attendance not found for employee " + employeeId + " on " + date);
        }

        dailySalary.setEmpName(attendance.getEmpName());

        // Calculate total worked hours
        double totalWorkedHours = calculateWorkedHours(attendance.getInTime(), attendance.getOutTime());

        // Cap total worked hours at 13 hours
        double workedHours = Math.min(totalWorkedHours, 13.0);
        dailySalary.setWorkedHours((float) workedHours);

        double overtimeHours = totalWorkedHours > 13 ? totalWorkedHours - 13 : 0;
        dailySalary.setOTHours((float) overtimeHours);

        HourPayment hourPayment = hourPaymentRepository.findByPosition(attendance.getPosition());
        if (hourPayment == null) {
            throw new RuntimeException("Hour payment not found for employee position " + attendance.getPosition());
        }

        dailySalary.setPayPerHours(hourPayment.getPayPerHour());

        double totalHourPayment = dailySalary.getPayPerHours() * dailySalary.getWorkedHours();
        dailySalary.setTotalHourPayment((float) totalHourPayment);

        if (overtimeHours > 0) {
            dailySalary.setPayPerOvertimeHour(hourPayment.getPayPerOverTimeHour());
            double payPerOvertimeMinute = dailySalary.getPayPerOvertimeHour() / 60.0; // Calculate pay per overtime minute
            double totalOvertimePayment = payPerOvertimeMinute * overtimeHours * 60; // Multiply by overtime minutes
            dailySalary.setTotalOvertimePayment((float) totalOvertimePayment);
            dailySalary.setGrossPayment(dailySalary.getTotalHourPayment() + dailySalary.getTotalOvertimePayment());
        } else {
            dailySalary.setPayPerOvertimeHour((float) 0); // Set to 0 if no overtime
            dailySalary.setTotalOvertimePayment((float) 0); // Set to 0 if no overtime
            dailySalary.setGrossPayment(dailySalary.getTotalHourPayment());
        }

        dailySalaryRepository.save(dailySalary);
        return dailySalary;
    }

    private double calculateWorkedHours(String inTime, String outTime) {
        LocalTime in = LocalTime.parse(inTime);
        LocalTime out = LocalTime.parse(outTime);

        // Calculate the duration between in-time and out-time
        Duration duration = Duration.between(in, out);

        // Convert duration to hours
        double hours = duration.toMinutes() / 60.0;

        // Ensure the result is non-negative
        return hours >= 0 ? hours : 0;
    }
}
