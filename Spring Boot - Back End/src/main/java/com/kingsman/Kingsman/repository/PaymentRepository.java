package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p.billType AS billType, SUM(p.amount) AS totalAmount FROM Payment p WHERE MONTH(p.payDate) = MONTH(CURRENT_DATE()) GROUP BY p.billType")
    List<Map<String, Object>> findTotalAmountsForCurrentMonthByBillType();



}