package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class LoginController {
    @Autowired
    private LoginRepository loginRepository; // Corrected variable name

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Employee emplogin= loginRepository.findByUsernameAndPassword(username, password);

        if (emplogin != null) {
            return ResponseEntity.ok(emplogin); // Return the whole Employee object
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

//    @GetMapping("/userdetails")
//    public ResponseEntity<?> getUserDetails(@RequestParam String username, @RequestParam String password) {
//        Employee empLogin = loginRepository.findByUsernameAndPassword(username, password);
//
//        if (empLogin != null) {
//            // You can return the entire user object or specific user details here
//            return ResponseEntity.ok(empLogin);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
//    }



}
