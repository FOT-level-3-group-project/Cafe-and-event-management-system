package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import com.kingsman.Kingsman.service.IncomeStatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/income")
public class IncomeStatementController {
    @Autowired
    private IncomeStatementService incomeStatementService;

    @PostMapping("/monthly")
    public MonthlyIncomeStatement saveMonthlyIncomeStatement(@RequestBody MonthlyIncomeStatement statement) {
        return incomeStatementService.saveMonthlyIncomeStatement(statement);
    }

    @PostMapping("/annual")
    public AnnualIncomeStatement saveAnnualIncomeStatement(@RequestBody AnnualIncomeStatement statement) {
        return incomeStatementService.saveAnnualIncomeStatement(statement);
    }

    @GetMapping("/monthly")
    public List<MonthlyIncomeStatement> getAllMonthlyIncomeStatements() {
        return incomeStatementService.getAllMonthlyIncomeStatements();
    }

    @GetMapping("/annual")
    public List<AnnualIncomeStatement> getAllAnnualIncomeStatements() {
        return incomeStatementService.getAllAnnualIncomeStatements();
    }

    @GetMapping("/previous-month")
    public Optional<MonthlyIncomeStatement> getPreviousMonthStatement(@RequestParam Date date) {
        return incomeStatementService.getPreviousMonthStatement(date);
    }
}
