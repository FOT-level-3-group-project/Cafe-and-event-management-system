package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // find bill type , month and year to check if payment is already done
    @Query("SELECT p FROM Payment p WHERE p.billType = :billType AND MONTH(p.payDate) = :month AND YEAR(p.payDate) = :year")
    Optional<Payment> findByBillTypeAndMonthYear(@Param("billType") String billType, @Param("month") int month, @Param("year") int year);

    // Find Total revenue of payments for current month
    @Query("SELECT p.billType AS billType, SUM(p.amount) AS totalAmount FROM Payment p WHERE MONTH(p.payDate) = MONTH(CURRENT_DATE()) GROUP BY p.billType")
    List<Map<String, Object>> findTotalAmountsForCurrentMonthByBillType();

    // Find Total revenue of payments for current year
    @Query("SELECT p.billType AS billType, SUM(p.amount) AS totalAmount FROM Payment p WHERE YEAR(p.payDate) = YEAR(CURRENT_DATE()) GROUP BY p.billType")
    List<Map<String, Object>> findTotalAmountsForCurrentYearByBillType();


}