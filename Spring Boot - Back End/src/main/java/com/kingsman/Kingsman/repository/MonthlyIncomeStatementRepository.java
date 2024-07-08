package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Optional;

@Repository
public interface MonthlyIncomeStatementRepository extends JpaRepository<MonthlyIncomeStatement, Integer> {
    Optional<MonthlyIncomeStatement> findByDate(Date date);
}
