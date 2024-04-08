package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.dto.CustomerDTO;
import com.kingsman.Kingsman.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query("SELECT c FROM Customer c WHERE c.cusEmail = :email")
    List<Customer> findByCusEmail(String email);
    Optional<Customer> findByCusMobile(String mobile);
    boolean existsByCusMobile(String cusMobile);
}
