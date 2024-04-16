package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.OutAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OutAttendanceRepository extends JpaRepository<OutAttendance, Long> {

}
