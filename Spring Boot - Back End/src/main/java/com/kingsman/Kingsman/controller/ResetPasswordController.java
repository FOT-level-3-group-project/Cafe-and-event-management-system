package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.ResetPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ResetPasswordController {
    @Autowired
    private ResetPasswordRepository resetPasswordRepository;

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Employee employee) {
        Employee existingEmployee = resetPasswordRepository.findByUsername(employee.getUsername());
        if (existingEmployee == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username does not exist");
        }

        existingEmployee.setPassword(employee.getPassword());
        resetPasswordRepository.save(existingEmployee);

        return ResponseEntity.ok("Password reset successfully");
    }
}
