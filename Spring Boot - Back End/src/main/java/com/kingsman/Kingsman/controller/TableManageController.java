package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.TableManage;
import com.kingsman.Kingsman.service.TableManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/table")
public class TableManageController {
    @Autowired
    TableManageService tableManageService;

    @PostMapping("/add")//add the table data
    ResponseEntity<String> addTable(@RequestBody TableManage table){
        try {
            table.setDate(new Date());
            tableManageService.addTable(table);
            return ResponseEntity.ok("Successfully added Table");
        } catch (DataIntegrityViolationException e) {
            // Handle the case where a table with the same tableNumber already exists
            return ResponseEntity.ok("Table with the same tableNumber already exists");
        }
    }

    @GetMapping("/all")//get all the table data
    ResponseEntity<List<TableManage>> getAllTables() {
        List<TableManage> tables = tableManageService.getAllTables();
        return ResponseEntity.ok(tables);
    }

    @DeleteMapping("/delete/{id}") // delete table by ID
    ResponseEntity<String> deleteTableById(@PathVariable Long id) {
        tableManageService.deleteTableById(id);
        return ResponseEntity.ok("Table deleted successfully");
    }

    @PutMapping("/{id}/availability") // update table availability by ID
    ResponseEntity<String> updateTableAvailability(@PathVariable Long id, @RequestParam boolean availability) {
        tableManageService.updateTableAvailability(id, availability);
        return ResponseEntity.ok("Table availability updated successfully");
    }


}
