package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.model.InAttendance;
import com.kingsman.Kingsman.model.OutAttendance;
import com.kingsman.Kingsman.repository.EmployeeRepository;
import com.kingsman.Kingsman.repository.InAttendanceRepository;
import com.kingsman.Kingsman.repository.OutAttendanceRepository;
import com.kingsman.Kingsman.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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

    @GetMapping("/employeeIdsAndPositions")
    public List<List<String>> getAllEmployeeIdsAndPositions() {
        // Fetch all employees from the repository
        List<Employee> employees = employeeRepository.findAll();

        // Extract and return the IDs and positions as separate lists
        return employees.stream()
                .map(employee -> Arrays.asList("EMP0" + String.format("%02d", employee.getId()), employee.getPosition()))
                .collect(Collectors.toList());
    }




    //get in and out times from different table
    //here i used services
@Autowired
private AttendanceService attendanceService;

    @GetMapping("/TodayAttendance")
    public List<Object[]> getTodayAttendanceData() {
        return attendanceService.getAttendanceData();
    }



    @PutMapping("/edit")
    public ResponseEntity<String> editAttendance(@RequestBody AttendanceRequest request) {
        String empId = request.getEmpId();
        LocalDate date = LocalDate.parse(request.getDate());
        String inTime = request.getInTime();
        String outTime = request.getOutTime();

        // Update inTime in InAttendance table
        Optional<InAttendance> inAttendanceOptional = inAttendanceRepository.findByEmpIdAndDate(empId, date);
        if (inAttendanceOptional.isPresent()) {
            InAttendance inAttendance = inAttendanceOptional.get();
            inAttendance.setInTime(inTime);
            inAttendanceRepository.save(inAttendance);
        } else {
            return new ResponseEntity<>("No inAttendance found for empId: " + empId + " and date: " + date, HttpStatus.NOT_FOUND);
        }

        // Update outTime in OutAttendance table
        Optional<OutAttendance> outAttendanceOptional = outAttendanceRepository.findByEmpIDAndDate(empId, date);
        if (outAttendanceOptional.isPresent()) {
            OutAttendance outAttendance = outAttendanceOptional.get();
            outAttendance.setOutTime(outTime);
            outAttendanceRepository.save(outAttendance);
        } else {
            return new ResponseEntity<>("No outAttendance found for empId: " + empId + " and date: " + date, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Attendance updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/DeleteAttendance/{empId}/{date}")
    public ResponseEntity<String> deleteAttendance(@PathVariable String empId, @PathVariable String date) {
        // Find and delete the attendance record from InAttendance table
        InAttendance inAttendance = inAttendanceRepository.findByEmpIdAndDate(empId, LocalDate.parse(date))
                .orElse(null);
        if (inAttendance != null) {
            inAttendanceRepository.delete(inAttendance);
        }

        // Find and delete the attendance record from OutAttendance table
        OutAttendance outAttendance = outAttendanceRepository.findByEmpIDAndDate(empId, LocalDate.parse(date))
                .orElse(null);
        if (outAttendance != null) {
            outAttendanceRepository.delete(outAttendance);
        }

        return ResponseEntity.ok("Attendance records for empId: " + empId + " and date: " + date + " deleted successfully");
    }


}