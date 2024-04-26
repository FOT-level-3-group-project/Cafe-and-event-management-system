package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.dto.OrderEmployeeFoodDTO;
import com.kingsman.Kingsman.model.InventoryItemUsageLog;
import com.kingsman.Kingsman.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Query("SELECT new com.kingsman.Kingsman.dto.OrderEmployeeFoodDTO(o.orderId , o.tableNumber, f.foodName, e.first_name, o.orderStatus,c.cusName,o.specialNote ) " +
            " FROM "
            + "    Order o "
            + "JOIN "
            + "    OrderItem oi ON o.orderId = oi.order.orderId "
            + "JOIN "
            + "    FoodItem f ON oi.foodItem.foodId = f.foodId "
            + "JOIN "
            + "    Employee e ON o.employee.id = e.id "
            + "LEFT JOIN "
            + "    Customer c ON o.customerId = c.cusId "
            + "WHERE "
            + "    DATE(o.createdDate) = :createdDate")
    List<OrderEmployeeFoodDTO> getOrderEmployeeFoodByCreatedDate(@Param("createdDate") LocalDate createdDate);

    @Query("SELECT new com.kingsman.Kingsman.dto.OrderEmployeeFoodDTO(o.orderId , o.tableNumber, f.foodName, e.first_name, o.orderStatus,c.cusName,o.specialNote ) " +
            " FROM "
            + "    Order o "
            + "JOIN "
            + "    OrderItem oi ON o.orderId = oi.order.orderId "
            + "JOIN "
            + "    FoodItem f ON oi.foodItem.foodId = f.foodId "
            + "JOIN "
            + "    Employee e ON o.employee.id = e.id "
            + "LEFT JOIN "
            + "    Customer c ON o.customerId = c.cusId "
            + "WHERE "
            + "    (o.orderStatus) = :orderStatus")
    List<OrderEmployeeFoodDTO> getOrderEmployeeFoodByOrderStatus(@Param("orderStatus") String orderStatus);



}
