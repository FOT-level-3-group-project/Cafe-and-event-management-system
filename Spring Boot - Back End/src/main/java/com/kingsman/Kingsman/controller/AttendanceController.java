package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.model.InAttendance;
import com.kingsman.Kingsman.model.OutAttendance;
import com.kingsman.Kingsman.repository.EmployeeRepository;
import com.kingsman.Kingsman.repository.InAttendanceRepository;
import com.kingsman.Kingsman.repository.OutAttendanceRepository;
import com.kingsman.Kingsman.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class AttendanceController {

    //send inTime Attendance
    @Autowired
    private InAttendanceRepository inAttendanceRepository;
    @PostMapping("/inAttendance")
    public InAttendance newAttendance(@RequestBody InAttendance newAttendance) {
        // Manually set the date before saving
        newAttendance.setDate(LocalDate.now());
        return inAttendanceRepository.save(newAttendance);
    }


    //send inTime Attendance
    @Autowired
    private OutAttendanceRepository outAttendanceRepository;

    @PostMapping("/outAttendance")
    public OutAttendance newAttendance(@RequestBody OutAttendance newAttendance) {
        // Manually set the date before saving
        newAttendance.setDate(LocalDate.now());
        return outAttendanceRepository.save(newAttendance);
    }

    //get Employee Ids
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employeeIds")
    public List<String> getAllEmployeeIds() {
        // Fetch all employees from the repository
        List<Employee> employees = employeeRepository.findAll();

        // Extract and return the IDs with the format "EMP01", "EMP02", etc.
        return employees.stream()
                .map(employee -> "EMP0" + String.format("%02d", employee.getId()))
                .collect(Collectors.toList());
    }


//get in and out times from different table
    //here i used services
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/data")
    public List<Object[]> getAttendanceData() {
        return attendanceService.getAttendanceData();
    }



}