package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AnnualIncomeStatementRepository extends JpaRepository<AnnualIncomeStatement, Integer> {

}
