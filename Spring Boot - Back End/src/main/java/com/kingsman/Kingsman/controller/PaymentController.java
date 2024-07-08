package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.exception.DuplicatePaymentException;
import com.kingsman.Kingsman.model.Payment;
import com.kingsman.Kingsman.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    // Endpoint to add a new payment
    @PostMapping("/addPayment")
    public ResponseEntity<?> addPayment(@RequestBody Payment payment) {
        try {
            Payment addedPayment = paymentService.addPayment(payment);
            return ResponseEntity.ok(addedPayment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Endpoint to update an existing payment
    @PutMapping("/updatePayment/{paymentId}")
    public ResponseEntity<Payment> updatePayment(@PathVariable int paymentId, @RequestBody Payment updatedPayment) {
        Payment payment = paymentService.getPayment(paymentId);
        if (payment == null) {
            return ResponseEntity.notFound().build();
        }
        updatedPayment.setPayID(paymentId); // Ensure the ID is set correctly
        Payment updated = paymentService.updatePayment(updatedPayment);
        return ResponseEntity.ok(updated);
    }

//    // Endpoint to delete a payment by ID
//    @DeleteMapping("/{paymentId}")
//    public void deletePayment(@PathVariable int paymentId) {
//        paymentService.deletePayment(paymentId);
//    }

    // Endpoint to retrieve a payment by ID
    @GetMapping("/{paymentId}")
    public Payment getPayment(@PathVariable int paymentId) {
        return paymentService.getPayment(paymentId);
    }

    // Endpoint to retrieve all payments
    @GetMapping("/getAllPayments")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Retrieve all payments for the current month
    @GetMapping("/current-month")
    public List<Map<String, Object>> getCurrentMonthPayments() {
        return paymentService.getTotalAmountsForCurrentMonthByBillType();
    }

    // Retrieve all payments for the current year
    @GetMapping("/current-year")
    public List<Map<String, Object>> getCurrentYearPayments() {
        return paymentService.getTotalAmountsForCurrentYearByBillType();
    }
}
