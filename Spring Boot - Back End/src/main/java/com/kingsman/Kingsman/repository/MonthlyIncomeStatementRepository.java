package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface MonthlyIncomeStatementRepository extends JpaRepository<MonthlyIncomeStatement, Integer> {
    // Query to find the monthly income statement by month and year
    @Query("SELECT m FROM MonthlyIncomeStatement m WHERE FUNCTION('MONTH', m.date) = :prevMonth AND FUNCTION('YEAR', m.date) = :prevYear")
    Optional<MonthlyIncomeStatement> findPreviousMonthStatement(@Param("prevMonth") int prevMonth, @Param("prevYear") int prevYear);
}

