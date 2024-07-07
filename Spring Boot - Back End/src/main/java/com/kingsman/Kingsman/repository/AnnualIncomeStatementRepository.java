package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnnualIncomeStatementRepository extends JpaRepository<AnnualIncomeStatement, Integer> {
    @Query("SELECT ais FROM AnnualIncomeStatement ais WHERE ais.year = :year")
    Optional<AnnualIncomeStatement> findByYear(@Param("year") int year);

    @Query("SELECT ais FROM AnnualIncomeStatement ais WHERE ais.year = :year - 1")
    Optional<AnnualIncomeStatement> findPreviousYearStatement(@Param("year") int year);
}