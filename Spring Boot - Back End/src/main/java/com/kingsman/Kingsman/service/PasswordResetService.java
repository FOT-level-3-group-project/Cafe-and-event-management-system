package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.dto.PasswordResetRequest;
import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.PasswordResetRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class PasswordResetService {
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @Autowired
    private EmailService emailService;

    private Map<String, String> otpMap = new HashMap<>();

    // Generates a random OTP
    private String generateOTP() {
        // Generate a random 4-digit OTP
        Random random = new Random();
        int otp = 1000 + random.nextInt(9999);
        System.out.println("Generated OTP: " + otp);
        return String.valueOf(otp);
    }

    @Transactional
    public boolean initiatePasswordReset(String username) throws MessagingException {
        // Retrieve the employee by username
        Employee employee = passwordResetRepository.findByUsername(username);
        if (employee == null) {
            return false; // User not found
        }

        // Generate OTP
        String generatedOTP = generateOTP();

        // Store the OTP in the map with the username as the key
        otpMap.put(username, generatedOTP);

        // Send OTP to the user's email address
        String email = employee.getEmail();
        String subject = "Password Reset OTP";
        String message = "Your OTP for password reset is: " + generatedOTP;
        emailService.sendEmail(email, subject, message);

        return true; // OTP sent successfully
    }

    public boolean verifyOTP(String username, String enteredOTP) {
        if (enteredOTP == null) {
            return false; // Entered OTP is null
        }

        // Retrieve the stored OTP for the given username
        String storedOTP = otpMap.get(username);
        if (storedOTP == null) {
            return false; // No OTP found for the given username
        }

        // Compare the entered OTP with the stored OTP
        return storedOTP.equals(enteredOTP);
    }

    @Transactional
    public boolean updatePassword(String username, String newPassword) {
        // Retrieve the employee by email
        Employee employee = passwordResetRepository.findByUsername(username);
        if (employee == null) {
            return false; // User not found
        }

        // Update the password
        employee.setPassword(newPassword);
        passwordResetRepository.save(employee);
        return true; // Password updated successfully
    }

    public boolean resetPassword(PasswordResetRequest passwordResetRequest) {
        String username = passwordResetRequest.getUsername();
        String newPassword = passwordResetRequest.getNewPassword();
        String confirmPassword = passwordResetRequest.getConfirmPassword();

        if (!newPassword.equals(confirmPassword)) {
            return false; // Passwords do not match
        }

        // Call method to update password
        return updatePassword(username, newPassword);
    }
}
