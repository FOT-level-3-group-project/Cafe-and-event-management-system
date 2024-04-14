package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.customerId = :customerId ORDER BY o.orderDateTime DESC")
    List<Order> findByCustomerId(@Param("customerId") Long customerId);

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.employee.id = :employeeId ORDER BY o.orderDateTime DESC")
    List<Order> findByEmployeeId(@Param("employeeId") Long employeeId);

    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems ORDER BY o.orderDateTime DESC")
    List<Order> findAllWithOrderItems();

    List<Order> findByOrderStatusOrderByOrderDateTimeDesc(String orderStatus);

    List<Order> findByPaymentStatusOrderByOrderDateTimeDesc(boolean paymentStatus);

    List<Order> findByOrderDateTime(Date orderDateTime);

}
