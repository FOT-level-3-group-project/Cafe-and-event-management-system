package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import com.kingsman.Kingsman.repository.AnnualIncomeStatementRepository;
import com.kingsman.Kingsman.repository.MonthlyIncomeStatementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class IncomeStatementService {
    @Autowired
    private MonthlyIncomeStatementRepository monthlyIncomeStatementRepository;

    @Autowired
    private AnnualIncomeStatementRepository annualIncomeStatementRepository;

    public Optional<MonthlyIncomeStatement> getPreviousMonthStatement(Date date) {
        return monthlyIncomeStatementRepository.findByDate((java.sql.Date) date);
    }

    public MonthlyIncomeStatement saveMonthlyIncomeStatement(MonthlyIncomeStatement statement) {
        return monthlyIncomeStatementRepository.save(statement);
    }

    public AnnualIncomeStatement saveAnnualIncomeStatement(AnnualIncomeStatement statement) {
        return annualIncomeStatementRepository.save(statement);
    }

    public List<MonthlyIncomeStatement> getAllMonthlyIncomeStatements() {
        return monthlyIncomeStatementRepository.findAll();
    }

    public List<AnnualIncomeStatement> getAllAnnualIncomeStatements() {
        return annualIncomeStatementRepository.findAll();
    }
}
