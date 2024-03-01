package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance,Long> {
}
