package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Order;
import com.kingsman.Kingsman.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}
