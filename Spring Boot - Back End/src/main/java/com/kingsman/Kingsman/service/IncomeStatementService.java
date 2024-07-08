package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import com.kingsman.Kingsman.repository.AnnualIncomeStatementRepository;
import com.kingsman.Kingsman.repository.MonthlyIncomeStatementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Optional;

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


    public Optional<AnnualIncomeStatement> getAnnualIncomeStatementByYear(int year) {
        return annualIncomeStatementRepository.findByYear(year);
    }

    public Optional<MonthlyIncomeStatement> getPreviousMonthIncomeStatement() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -1);
        int prevMonth = cal.get(Calendar.MONTH) + 1; // Calendar.MONTH is 0-based, so add 1
        int prevYear = cal.get(Calendar.YEAR);

        return monthlyIncomeStatementRepository.findPreviousMonthStatement(prevMonth, prevYear);
    }
}
