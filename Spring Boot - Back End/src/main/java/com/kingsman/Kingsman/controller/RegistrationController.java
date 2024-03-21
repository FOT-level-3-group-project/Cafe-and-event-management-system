package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {
    @Autowired
    private RegistrationRepository registrationRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Employee employee) {
        Employee existingEmployee = registrationRepository.findByUsername(employee.getUsername());
        if (existingEmployee != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        Employee existingEmployeeEmail = registrationRepository.findByEmail(employee.getEmail());
        if (existingEmployeeEmail != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }


        registrationRepository.save(employee);

        return ResponseEntity.ok("Employee registered successfully");
    }
}
