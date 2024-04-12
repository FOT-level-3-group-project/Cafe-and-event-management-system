package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.ManageEmployeeRepository;
import com.kingsman.Kingsman.service.ManageEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class ManageEmployeeController {
    @Autowired
    private ManageEmployeeService manageEmployeeService;

    @Autowired
    private ManageEmployeeRepository manageEmployeeRepository;

    @GetMapping("manage-employees")
    public List<Employee> getAllEmployees() {
        return manageEmployeeService.getAllEmployees();
    }
    
}
