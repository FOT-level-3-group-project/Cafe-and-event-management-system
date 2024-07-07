package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.MonthSalary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MonthSalaryRepository extends JpaRepository<MonthSalary, Long> {
    List<MonthSalary> findByEmpName(String empName);

//    Optional<MonthSalary> findByEmpNameAndMonth(String empName, YearMonth currentMonth);
//
//    List<MonthSalary> findByMonth(YearMonth currentMonth);

    Optional<MonthSalary> findByEmpNameAndMonth(String empName, Date currentMonth);

    List<MonthSalary> findByMonth(Date currentMonth);


    // Query to sum up grossPayment for the current month
    @Query("SELECT SUM(m.grossPayment) FROM MonthSalary m WHERE MONTH(m.month) = MONTH(:currentMonth) AND YEAR(m.month) = YEAR(:currentMonth)")
    Float sumGrossPaymentForCurrentMonth(@Param("currentMonth") Date currentMonth);

    // Query to sum up grossPayment for the current year
    @Query("SELECT SUM(m.grossPayment) FROM MonthSalary m WHERE YEAR(m.month) = YEAR(:currentYear)")
    Float sumGrossPaymentForCurrentYear(@Param("currentYear") Date currentYear);
}
