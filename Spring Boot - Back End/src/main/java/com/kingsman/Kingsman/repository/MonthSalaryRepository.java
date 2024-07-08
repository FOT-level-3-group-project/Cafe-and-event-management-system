package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.MonthSalary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

public interface MonthSalaryRepository extends JpaRepository<MonthSalary, Long> {
    List<MonthSalary> findByEmpName(String empName);

    Optional<MonthSalary> findByEmpNameAndMonth(String empName, YearMonth currentMonth);


    List<MonthSalary> findByMonth(String currentMonth);

    Optional<MonthSalary> findByEmpNameAndMonth(String empName, String displayName);



}
