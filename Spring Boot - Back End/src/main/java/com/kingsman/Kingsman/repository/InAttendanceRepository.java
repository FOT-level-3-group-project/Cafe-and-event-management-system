package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.InAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface InAttendanceRepository extends JpaRepository<InAttendance, Long> {


}
