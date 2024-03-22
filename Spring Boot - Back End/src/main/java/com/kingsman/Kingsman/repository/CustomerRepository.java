package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
