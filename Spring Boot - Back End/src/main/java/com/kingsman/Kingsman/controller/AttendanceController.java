package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Attendance;
import com.kingsman.Kingsman.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AttendanceController {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/attendance")
    ResponseEntity<?> newAttendance(@RequestBody Attendance newAttendance) {
        // Check if a record with the same name and date already exists
        List<Attendance> existingRecords = attendanceRepository.findByNameAndDate(newAttendance.getName(), newAttendance.getDate());

        // If there's no existing record, save the new attendance
        if (existingRecords.isEmpty()) {
            Attendance savedAttendance = attendanceRepository.save(newAttendance);
            return ResponseEntity.ok(savedAttendance);
        } else {
            // Handle the case where a record already exists for the same name and date
            // Return a warning message in the response
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Warning: Attendance already exists for this person on this date!");
        }
    }

    @GetMapping("/attendanceView")
    public List<Attendance> getTodayAttendance() {
        // Get today's date in the ISO 8601 format (YYYY-MM-DD)
        String todayDate = java.time.LocalDate.now().toString();

        // Use the repository method to retrieve records for today's date
        return attendanceRepository.findByDate(todayDate);
    }





}
