package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.TableManage;
import com.kingsman.Kingsman.service.TableManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/table")
public class TableManageController {
    @Autowired
    TableManageService tableManageService;

    @PostMapping("/add")
    ResponseEntity<String> addTable(@RequestBody TableManage table){
        tableManageService.addTable(table);
        return ResponseEntity.ok("Successfully added Table");
    }
}
