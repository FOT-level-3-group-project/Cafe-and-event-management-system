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
    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.customerId = :customerId ORDER BY o.orderDateTime DESC")   //This method retrieves a list of Order entities associated with a specific customer ID
    List<Order> findByCustomerId(@Param("customerId") Long customerId);  //performs a left join with the orderItems collection and orders the results by orderDateTime in descending order.

    @Query("SELECT o FROM Order o LEFT JOIN FETCH o.orderItems WHERE o.employee.id = :employeeId ORDER BY o.orderDateTime DESC") //method retrieves a list of Order entities associated with a specific employee ID.
    List<Order> findByEmployeeId(@Param("employeeId") Long employeeId);//performs a left join with the orderItems collection and orders the results by orderDateTime in descending order.

    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems ORDER BY o.orderDateTime DESC")//Retrieves a distinct list of all Order entities, including their associated orderItems
    List<Order> findAllWithOrderItems();// The results are ordered by orderDateTime in descending order.

    List<Order> findByOrderStatusOrderByOrderDateTimeDesc(String orderStatus);//Retrieves a list of Order entities based on their order status
    //The results are ordered by orderDateTime in descending order.

    List<Order> findByPaymentStatusOrderByOrderDateTimeDesc(boolean paymentStatus);// Retrieves a list of Order entities based on their payment status

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
            + "    (o.orderId) = :orderId")
    List<OrderEmployeeFoodDTO> getOrderEmployeeFoodById(@Param("orderId") Long orderId);

    //  Find Total After Discount For Current Month
    @Query("SELECT SUM(o.totalAfterDiscount) FROM Order o WHERE MONTH(o.orderDateTime) = MONTH(CURRENT_DATE) AND YEAR(o.orderDateTime) = YEAR(CURRENT_DATE)")
    Double findTotalAfterDiscountForCurrentMonth();

    //  Find Total After Discount For Current Year
    @Query("SELECT SUM(o.totalAfterDiscount) FROM Order o WHERE YEAR(o.orderDateTime) = YEAR(CURRENT_DATE)")
    Double findTotalAfterDiscountForCurrentYear();

    List<Order> findOrdersByCreatedDateBetweenAndEmployeeIdAndOrderStatus(LocalDateTime startDate, LocalDateTime endDate, Long employeeId, String orderStatus);
}
