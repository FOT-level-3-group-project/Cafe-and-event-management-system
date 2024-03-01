package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Attendance;
import com.kingsman.Kingsman.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AttendanceController {
    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/attendance")
    Attendance newAttendance (@RequestBody Attendance newAttendance)
    {
        return attendanceRepository.save(newAttendance);
    }


}
