package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.controller.AttendanceDTO;
import com.kingsman.Kingsman.model.Attendance;
import com.kingsman.Kingsman.model.InAttendance;
import com.kingsman.Kingsman.model.OutAttendance;
import com.kingsman.Kingsman.repository.AttendanceRepository;
import com.kingsman.Kingsman.repository.InAttendanceRepository;
import com.kingsman.Kingsman.repository.OutAttendanceRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Transactional
public class AttendanceService {

    @Autowired
    private EntityManager entityManager;

    public List<Object[]> getAttendanceData() {
        // Get today's date
        LocalDate today = LocalDate.now();

        // Construct the JPQL query to retrieve today's attendance data
        String jpql = "SELECT i.empId, i.position, i.date, i.inTime, o.outTime " +
                "FROM InAttendance i " +
                "LEFT JOIN OutAttendance o ON i.empId = o.empID AND i.date = o.date " +
                "WHERE i.date = :date";

        // Create the query object
        Query query = entityManager.createQuery(jpql);

        // Format today's date as a string in the format yyyy-MM-dd
        String formattedDate = today.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Convert the formatted date string to LocalDate
        LocalDate dateParameter = LocalDate.parse(formattedDate);

        // Set the parameter for the date
        query.setParameter("date", dateParameter);

        // Execute the query and return the result list
        List<Object[]> resultList = query.getResultList();

        // Check if resultList is empty, if so, return the message "Still No Attendance is Available for Today"
        if (resultList.isEmpty()) {
            return Collections.singletonList(new String[]{"Still No Attendance is Available for Today"});
        }

        // Iterate over the result list and handle null outTime values
        for (Object[] result : resultList) {
            if (result[4] == null) {
                result[4] = "Still Working";
            }
        }

        return resultList;
    }

    private final AttendanceRepository attendanceRepository;

    // Constructor injection of AttendanceRepository
    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public List<AttendanceDTO> getAttendanceForCurrentDate() {
        LocalDate currentDate = LocalDate.now();
        List<Attendance> attendanceList = attendanceRepository.findByDate(currentDate);

        // Convert Attendance entities to custom DTOs
        return attendanceList.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Helper method to map Attendance entity to custom DTO
    private AttendanceDTO mapToDTO(Attendance attendance) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setEmpId(attendance.getEmpId());
        dto.setEmpName(attendance.getEmpName());
        dto.setPosition(attendance.getPosition());
        dto.setDate(attendance.getDate());
        dto.setInTime(attendance.getInTime());
        dto.setOutTime(attendance.getOutTime());
        return dto;
    }

    //delete




    public void deleteAttendance(String empId, LocalDate date) {
        attendanceRepository.deleteByEmpIdAndDate(empId, date);
    }


    //current month attendance


    public List<Attendance> getAttendanceForCurrentMonth() {
        // Get the current year and month
        YearMonth currentYearMonth = YearMonth.now();

        // Get the first day of the current month
        LocalDate firstDayOfMonth = currentYearMonth.atDay(1);

        // Get the last day of the current month
        LocalDate lastDayOfMonth = currentYearMonth.atEndOfMonth();

        // Retrieve attendance records within the current month
        return attendanceRepository.findByDateBetween(firstDayOfMonth, lastDayOfMonth);
    }

//Search acording to empid and today or this month data



}


