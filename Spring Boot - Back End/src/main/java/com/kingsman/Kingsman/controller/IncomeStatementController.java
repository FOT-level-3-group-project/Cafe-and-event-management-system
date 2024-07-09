package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.AnnualIncomeStatement;
import com.kingsman.Kingsman.model.MonthlyIncomeStatement;
import com.kingsman.Kingsman.service.IncomeStatementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/income")
public class IncomeStatementController {
    @Autowired
    private IncomeStatementService incomeStatementService;

    // save monthly income statement data to the DB
    @PostMapping("/save-monthly")
    public ResponseEntity<MonthlyIncomeStatement> saveMonthlyIncomeStatement(@RequestBody MonthlyIncomeStatement statement) {
        MonthlyIncomeStatement savedStatement = incomeStatementService.saveMonthlyIncomeStatement(statement);
        return new ResponseEntity<>(savedStatement, HttpStatus.CREATED);
    }

    // save annaul income statement data to the db
    @PostMapping("/save-annual")
    public ResponseEntity<AnnualIncomeStatement> saveAnnualIncomeStatement(@RequestBody AnnualIncomeStatement statement) {
        try {
            System.out.println("Received Annual Income Statement:");
            System.out.println("Year: " + statement.getYear());
            System.out.println("Net Profit: " + statement.getNetProfit());
            System.out.println("Total Income: " + statement.getTotalIncome());
            System.out.println("Total Expenses: " + statement.getTotalExpenses());

            AnnualIncomeStatement savedStatement = incomeStatementService.saveAnnualIncomeStatement(statement);
            return new ResponseEntity<>(savedStatement, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get previous year data
    @GetMapping("/previous-year/{year}")
    public ResponseEntity<AnnualIncomeStatement> getAnnualIncomeStatementByYear(@PathVariable int year) {
        Optional<AnnualIncomeStatement> statement = incomeStatementService.getPreviousAnnualIncomeStatementByYear(year);
        return statement.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // get previous month data
    @GetMapping("/previous-month/{month}")
    public ResponseEntity<MonthlyIncomeStatement> getPreviousMonthIncomeStatement() {
        Optional<MonthlyIncomeStatement> statement = incomeStatementService.getPreviousMonthIncomeStatement();
        return statement.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
