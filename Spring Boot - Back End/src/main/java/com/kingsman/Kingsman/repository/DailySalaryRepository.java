package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.DailySalary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DailySalaryRepository extends JpaRepository<DailySalary, Long> {
}
