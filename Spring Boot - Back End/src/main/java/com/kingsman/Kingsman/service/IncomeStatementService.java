package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import com.kingsman.Kingsman.repository.AnnualIncomeStatementRepository;
import com.kingsman.Kingsman.repository.MonthlyIncomeStatementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IncomeStatementService {
    @Autowired
    private MonthlyIncomeStatementRepository monthlyIncomeStatementRepository;

    @Autowired
    private AnnualIncomeStatementRepository annualIncomeStatementRepository;

    public MonthlyIncomeStatement saveMonthlyIncomeStatement(MonthlyIncomeStatement statement) {
        return monthlyIncomeStatementRepository.save(statement);
    }

    public AnnualIncomeStatement saveAnnualIncomeStatement(AnnualIncomeStatement statement) {
        return annualIncomeStatementRepository.save(statement);
    }
}
