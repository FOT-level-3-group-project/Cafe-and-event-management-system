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
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailySalaryService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private HourPaymentRepository hourPaymentRepository;

    @Autowired
    private DailySalaryRepository dailySalaryRepository;

    public DailySalary calculateDailySalary(String employeeId, String date) {
        LocalDate dateObj = LocalDate.parse(date);

        // Check if DailySalary record already exists for the employee on the specified date
        Optional<DailySalary> existingDailySalary = dailySalaryRepository.findByEmpIdAndDate(employeeId, dateObj);
        DailySalary dailySalary = existingDailySalary.orElseGet(DailySalary::new); // Create new if not found

        dailySalary.setEmpId(employeeId);
        dailySalary.setDate(dateObj);

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

        // Set the pay per overtime hour regardless of overtime hours
        dailySalary.setPayPerOvertimeHour(hourPayment.getPayPerOverTimeHour());

        if (overtimeHours > 0) {
            double payPerOvertimeMinute = dailySalary.getPayPerOvertimeHour() / 60.0; // Calculate pay per overtime minute
            double totalOvertimePayment = payPerOvertimeMinute * overtimeHours * 60; // Multiply by overtime minutes
            dailySalary.setTotalOvertimePayment((float) totalOvertimePayment);
            dailySalary.setGrossPayment(dailySalary.getTotalHourPayment() + dailySalary.getTotalOvertimePayment());
        } else {
            dailySalary.setTotalOvertimePayment((float) 0); // Set to 0 if no overtime
            dailySalary.setGrossPayment(dailySalary.getTotalHourPayment());
        }

        dailySalaryRepository.save(dailySalary);
        return dailySalary;
    }

    public void calculateAndSaveAllEmployeesDailySalary() {
        List<LocalDate> distinctDates = attendanceRepository.findAll()
                .stream()
                .map(Attendance::getDate)
                .distinct()
                .collect(Collectors.toList());

        for (LocalDate date : distinctDates) {
            List<Attendance> attendances = attendanceRepository.findByDate(date);
            for (Attendance attendance : attendances) {
                String employeeId = attendance.getEmpId();
                String dateString = date.toString();
                try {
                    calculateDailySalary(employeeId, dateString);
                } catch (Exception e) {
                    // Handle the exception as needed
                    System.out.println("Error calculating salary for employee " + employeeId + " on " + dateString + ": " + e.getMessage());
                }
            }
        }
    }

    public List<DailySalary> getAllEmployeesDailySalaryForCurrentDate() {
        LocalDate currentDate = LocalDate.now();
        return dailySalaryRepository.findByDate(currentDate);
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
