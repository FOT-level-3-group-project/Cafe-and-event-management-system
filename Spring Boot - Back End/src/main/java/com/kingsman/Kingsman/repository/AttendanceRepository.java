package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDate(String date);
    List<Attendance> findByNameAndDate(String name, String date);
}
