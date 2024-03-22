package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.dto.OrderRequest;
import com.kingsman.Kingsman.model.Customer;
import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.model.Order;
import com.kingsman.Kingsman.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create") // Create Order
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = new Order();
        // Map data from OrderRequest to Order entity
        order.setCustomer(new Customer(orderRequest.getCustomerId())); // Assuming you have a Customer entity
        order.setFoodItem(new FoodItem(orderRequest.getFoodItemId())); // Assuming you have a FoodItem entity
        order.setQuantity(orderRequest.getQuantity());
        order.setSpecialNote(orderRequest.getSpecialNote());

         orderService.saveOrder(order);
        return ResponseEntity.ok("Order Successfully Created");
    }
}
