package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.dto.OrderDTO;
import com.kingsman.Kingsman.model.Order;
import com.kingsman.Kingsman.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable("id") Long orderId) {
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByCustomerId(@PathVariable("customerId") Long customerId) {
        return ResponseEntity.ok(orderService.getOrdersByCustomerId(customerId));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByEmployeeId(@PathVariable("employeeId") Long employeeId) {
        return ResponseEntity.ok(orderService.getOrdersByEmployeeId(employeeId));
    }

    @GetMapping("/status/{orderStatus}")
    public ResponseEntity<List<OrderDTO>> getOrdersByOrderStatus(@PathVariable("orderStatus") String orderStatus) {
        return ResponseEntity.ok(orderService.getOrdersByOrderStatus(orderStatus));
    }

    @GetMapping("/payment-status/{paymentStatus}")
    public ResponseEntity<List<OrderDTO>> getOrdersByPaymentStatus(@PathVariable("paymentStatus") boolean paymentStatus) {
        return ResponseEntity.ok(orderService.getOrdersByPaymentStatus(paymentStatus));
    }

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        return new ResponseEntity<>(orderService.createOrder(orderDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable("id") Long orderId, @RequestBody OrderDTO orderDTO) {
        return ResponseEntity.ok(orderService.updateOrder(orderId, orderDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("id") Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/items/{orderItemId}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable("orderItemId") Long orderItemId) {
        orderService.deleteOrderItem(orderItemId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/date/{orderDateTime}") //get data using the specific date
    public List<Order> getOrdersByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date orderDateTime) {
        return orderService.getOrdersByDate(orderDateTime);
    }

}
