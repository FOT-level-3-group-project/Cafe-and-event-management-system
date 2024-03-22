package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
