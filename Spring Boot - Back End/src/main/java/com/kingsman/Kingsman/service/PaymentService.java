package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Payment;
import com.kingsman.Kingsman.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void deletePayment(int paymentId) {
        paymentRepository.deleteById(paymentId);
    }

    public Payment getPayment(int paymentId) {
        Optional<Payment> payment = paymentRepository.findById(paymentId);
        return payment.orElse(null);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

//     Method to get total amounts for current month by bill type
    public List<Map<String, Object>> getTotalAmountsForCurrentMonthByBillType() {
        return paymentRepository.findTotalAmountsForCurrentMonthByBillType();
    }

    // Method to get payments for the current year
//    public List<Payment> getPaymentsForCurrentYear() {
//        // Implement logic to fetch payments for the current year from repository
//        LocalDate startDate = LocalDate.now().withDayOfYear(1); // Start of current year
//        LocalDate endDate = LocalDate.now().with(TemporalAdjusters.lastDayOfYear()); // End of current year
//
//        return paymentRepository.findByPaymentDateBetween(startDate, endDate);
//    }

}
