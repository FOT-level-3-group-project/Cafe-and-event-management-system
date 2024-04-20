package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Attendance;
import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.model.InAttendance;
import com.kingsman.Kingsman.model.OutAttendance;
import com.kingsman.Kingsman.repository.AttendanceRepository;
import com.kingsman.Kingsman.repository.EmployeeRepository;
import com.kingsman.Kingsman.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
public class AttendanceController {



    //get Employee Ids
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employeeIdsAndPositions")
    public List<List<String>> getAllEmployeeIdsAndPositions() {
        // Fetch all employees from the repository
        List<Employee> employees = employeeRepository.findAll();

        // Extract and return the IDs, names, and positions as separate lists
        return employees.stream()
                .map(employee -> {
                    List<String> employeeInfo = Arrays.asList(
                            "EMP" + String.format("%03d", employee.getId()),
                            employee.getFirst_name() + " " + employee.getLast_name(),
                            employee.getPosition()
                    );
                    return employeeInfo;
                })
                .collect(Collectors.toList());
    }










    //test

    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/attendance/in")
    public ResponseEntity<String> addInTime(@RequestBody Attendance attendance) {
        try {
            // Set the date
            attendance.setDate(LocalDate.now()); // You might want to adjust the date logic as per your requirement

            // Save the attendance record
            attendanceRepository.save(attendance);

            return ResponseEntity.ok("In time recorded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to record in time.");
        }
    }

    @PostMapping("/attendance/out")
    public ResponseEntity<String> addOutTime(@RequestBody Attendance attendance) {
        try {
            // Fetch the attendance record by employee ID and date
            Attendance existingAttendance = attendanceRepository.findByEmpIdAndDate(attendance.getEmpId(), LocalDate.now());

            if (existingAttendance != null) {
                // Update the existing attendance record with out time
                existingAttendance.setOutTime(attendance.getOutTime());
                attendanceRepository.save(existingAttendance);
                return ResponseEntity.ok("Out time recorded successfully.");
            } else {
                // Handle case where no matching in-time record is found
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No matching in-time record found for employee: " + attendance.getEmpId());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to record out time.");
        }
    }

    //Today attendance

    private final AttendanceService attendanceService;


    // Constructor injection of AttendanceService
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/current-date")
    public List<AttendanceDTO> getAttendanceForCurrentDate() {
        return attendanceService.getAttendanceForCurrentDate();
    }

    //current Month attendance

    @GetMapping("/current-month")
    public ResponseEntity<List<Attendance>> getAttendanceForCurrentMonth() {
        List<Attendance> attendanceList = attendanceService.getAttendanceForCurrentMonth();
        return new ResponseEntity<>(attendanceList, HttpStatus.OK);
    }


//update
    @PutMapping("/update")
    public ResponseEntity<String> updateAttendance(@RequestBody AttendanceUpdateRequest request) {
        // Validate input
        if (request.getEmpId() == null || request.getDate() == null ||
                request.getInTime() == null || request.getOutTime() == null) {
            return ResponseEntity.badRequest().body("Required fields are missing.");
        }

        // Fetch attendance record
        Attendance attendance = attendanceRepository.findByEmpIdAndDate(request.getEmpId(), request.getDate());
        if (attendance == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Attendance record not found.");
        }

        // Update attendance record
        attendance.setInTime(request.getInTime());
        attendance.setOutTime(request.getOutTime());

        // Save changes
        attendanceRepository.save(attendance);

        return ResponseEntity.ok("Attendance record updated successfully.");
    }

    //delete



    @DeleteMapping("/DeleteAttendance/{empId}/{date}")
    public ResponseEntity<String> deleteAttendance(@PathVariable String empId, @PathVariable String date) {
        try {
            // Parse the date string into a LocalDate object
            LocalDate attendanceDate = LocalDate.parse(date);

            // Delete the attendance record based on empId and date
            attendanceService.deleteAttendance(empId, attendanceDate);

            return ResponseEntity.ok("Attendance record deleted successfully.");
        } catch (Exception e) {
            // Handle any exceptions and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete attendance record.");
        }
    }


//absenties search


    @GetMapping("/Absent-Employees")
    public List<EmployeeDTO> compareEmployeeAttendance() {
        // Fetch data from Employee table
        List<Employee> employees = employeeRepository.findAll();

        // Fetch data from Attendance table
        List<Attendance> attendanceList = attendanceRepository.findAll();

        // Get list of employee IDs present in the Attendance table
        List<String> attendanceEmpIds = attendanceList.stream()
                .map(Attendance::getEmpId)
                .collect(Collectors.toList());

        // Create a list to store the result
        List<EmployeeDTO> resultList = new ArrayList<>();

        // Iterate over employees
        for (Employee employee : employees) {
            // Format data and add to result list if employee ID not present in the Attendance table
            String empId = "EMP" + String.format("%03d", employee.getId());
            if (!attendanceEmpIds.contains(empId)) {
                resultList.add(EmployeeDTO.fromEmployee(employee));
            }
        }

        return resultList;
    }

    //Marking Absent Employees


    @PostMapping("/attendances")
    public ResponseEntity<String> saveAttendances(@RequestBody List<Attendance> attendances) {
        try {
            // Save all attendances
            attendanceRepository.saveAll(attendances);
            return ResponseEntity.ok("Attendances saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save attendances: " + e.getMessage());
        }
    }



}