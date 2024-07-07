package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Payment;
import com.kingsman.Kingsman.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Payment addPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    // Endpoint to update an existing payment
    @PutMapping("/{paymentId}")
    public Payment updatePayment(@PathVariable int paymentId, @RequestBody Payment updatedPayment) {
        updatedPayment.setPayID(paymentId); // Ensure the ID is set correctly
        return paymentService.updatePayment(updatedPayment);
    }

    // Endpoint to delete a payment by ID
    @DeleteMapping("/{paymentId}")
    public void deletePayment(@PathVariable int paymentId) {
        paymentService.deletePayment(paymentId);
    }

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
//    @GetMapping("/current-year")
//    public ResponseEntity<List<Payment>> getCurrentYearPayments() {
//        List<Payment> payments = paymentService.getPaymentsForCurrentYear();
//        return ResponseEntity.ok(payments);
//    }




}
