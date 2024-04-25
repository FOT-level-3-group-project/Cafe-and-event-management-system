package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.*;
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
            // Check if an in-time record already exists for the employee ID and date
            Attendance existingInTime = attendanceRepository.findByEmpIdAndDate(attendance.getEmpId(), LocalDate.now());

            if (existingInTime != null) {
                // If an in-time record already exists for the same employee ID and date, return an error response
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An in-time record already exists for employee: " + attendance.getEmpId());
            } else {
                // Save the in-time record
                attendance.setDate(LocalDate.now()); // You might want to adjust the date logic as per your requirement
                attendanceRepository.save(attendance);
                return ResponseEntity.ok("In time recorded successfully.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to record in time.");
        }
    }

    @PostMapping("/attendance/out")
    public ResponseEntity<String> addOutTime(@RequestBody Attendance attendance) {
        try {
            // Fetch the in-time record by employee ID and date
            Attendance existingInTime = attendanceRepository.findByEmpIdAndDate(attendance.getEmpId(), LocalDate.now());

            if (existingInTime != null) {
                // Check if an out-time record already exists for the same employee ID and date
                if (existingInTime.getOutTime() != null) {
                    // If an out-time record already exists for the same employee ID and date, return an error response
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An out-time record already exists for employee: " + attendance.getEmpId());
                } else {
                    // Update the existing in-time record with out time
                    existingInTime.setOutTime(attendance.getOutTime());
                    attendanceRepository.save(existingInTime);
                    return ResponseEntity.ok("Out time recorded successfully.");
                }
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





    @Autowired
    public AttendanceController(EmployeeRepository employeeRepository, AttendanceRepository attendanceRepository, AttendanceService attendanceService) {
        this.employeeRepository = employeeRepository;
        this.attendanceRepository = attendanceRepository;
        this.attendanceService = attendanceService;
    }

    @GetMapping("/employeeDetails")
    public List<String[]> getEmployeeDetails() {
        // Get all employees
        List<Employee> employees = employeeRepository.findAll();

        // Get attendance records for the current date
        LocalDate currentDate = LocalDate.now();
        List<Attendance> attendanceRecords = attendanceRepository.findByDate(currentDate);

        // Extract empIds from attendance records for comparison
        List<String> attendedEmployeeIds = attendanceRecords.stream()
                .map(Attendance::getEmpId)
                .collect(Collectors.toList());

        // Filter employees who are not in the attendance records for the current date
        List<Employee> employeesNotAttended = employees.stream()
                .filter(employee -> !attendedEmployeeIds.contains("EMP" + String.format("%03d", employee.getId())))
                .collect(Collectors.toList());

        // Map employee details to the desired format
        List<String[]> employeeDetails = employeesNotAttended.stream()
                .map(employee -> new String[]{
                        "EMP" + String.format("%03d", employee.getId()), // Format ID as EMPXXX
                        employee.getFirst_name() + " " + employee.getLast_name(), // Concatenate first and last name
                        employee.getPosition()
                })
                .collect(Collectors.toList());

        return employeeDetails;
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

    // get attendance acording to date range

    @GetMapping("/fetch-by-date-range/{startDate}/{endDate}")
    public ResponseEntity<List<Attendance>> fetchAttendanceByDateRange(
            @PathVariable("startDate") String startDate,
            @PathVariable("endDate") String endDate) {
        // Convert date strings to LocalDate objects
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);

        // Fetch attendance data from the repository within the specified date range
        List<Attendance> attendanceList = attendanceRepository.findByDateBetween(start, end);

        // Return the fetched attendance data with a success status code
        return new ResponseEntity<>(attendanceList, HttpStatus.OK);
    }


    //Emp Ids (EMP001.EMP002)


    @GetMapping("/employeeIds")
    public List<String> getAllEmployeeIds() {
        // Fetch all employees from the repository
        List<Employee> employees = employeeRepository.findAll();

        // Map the employee IDs to the "EMPXXX" format
        List<String> formattedEmployeeIds = employees.stream()
                .map(employee -> "EMP" + String.format("%03d", employee.getId()))
                .collect(Collectors.toList());

        return formattedEmployeeIds;
    }


}