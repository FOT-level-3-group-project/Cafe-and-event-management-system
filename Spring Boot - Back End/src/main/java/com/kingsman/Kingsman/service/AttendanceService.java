package com.kingsman.Kingsman.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;


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


}
