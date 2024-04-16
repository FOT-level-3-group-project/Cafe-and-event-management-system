package com.kingsman.Kingsman.service;




import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AttendanceService {

    @Autowired
    private EntityManager entityManager;

    public List<Object[]> getAttendanceData() {
        String jpql = "SELECT i.empId, i.position, i.date, i.inTime, o.outTime " +
                "FROM InAttendance i " +
                "LEFT JOIN OutAttendance o ON i.empId = o.empID AND i.date = o.date";

        Query query = entityManager.createQuery(jpql);
        return query.getResultList();
    }




}
