package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.ManageEmployeeRepository;
import com.kingsman.Kingsman.service.ManageEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployeeById(@PathVariable Integer id) {
        try {
            Optional<Employee> employeeOptional = manageEmployeeRepository.findById(id); //search employee by id
            if (!employeeOptional.isPresent()) {
                return new ResponseEntity<>("Employee with ID " + id + " not found", HttpStatus.NOT_FOUND);
            }

            // Delete the employee
            manageEmployeeRepository.deleteById(id);
            return new ResponseEntity<>("Employee with ID " + id + " has been deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete employee with ID " + id, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
