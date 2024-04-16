package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.InAttendance;
import com.kingsman.Kingsman.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AttendanceController {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/attendance")
    public InAttendance newAttendance(@RequestBody InAttendance newAttendance) {
        // Manually set the date before saving
        newAttendance.setDate(LocalDate.now());
        return attendanceRepository.save(newAttendance);
    }

}
