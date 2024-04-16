package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.InAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<InAttendance, Long> {

}
