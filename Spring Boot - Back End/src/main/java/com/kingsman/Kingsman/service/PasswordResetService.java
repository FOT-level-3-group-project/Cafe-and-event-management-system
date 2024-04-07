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

    @Autowired
    private PasswordResetRequest passwordResetRequest;

    private Map<String, String> otpMap = new HashMap<>();


    // This method generates a random OTP
    private String generateOTP() {
        // Generate a random 4-digit OTP
        Random random = new Random();
        int otp = 1000 + random.nextInt(9999);
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
        String otp = generateOTP();

        // Save OTP to the employee record (you may need to modify your Employee entity to include an OTP field)
        employee.setOtp(otp);
        passwordResetRepository.save(employee);

        // Send OTP to the user's email address
        String email = employee.getEmail();
        String subject = "Password Reset OTP";
        String message = "Your OTP for password reset is: " + otp;
        emailService.sendEmail(email, subject, message);

        return true; // OTP sent successfully
    }
    public boolean isUserExists(String username, String email) {
        Employee employee = passwordResetRepository.findByUsernameAndEmail(username, email);
        System.out.println(employee);
        return employee != null;
    }

    // Add a new method to verify the OTP
    public boolean verifyOTP(String username, String enteredOTP) {
        // Retrieve the employee by email
        Employee employee = passwordResetRepository.findByUsername(username);
        if (employee == null) {
            return false; // User not found
        }

        // Check if the entered OTP matches the OTP stored in the database
        String storedOTP = employee.getOtp();
        return storedOTP != null && storedOTP.equals(enteredOTP);
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
