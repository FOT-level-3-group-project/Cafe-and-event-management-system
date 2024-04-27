package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.dto.CustomerDTO;
import com.kingsman.Kingsman.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {    //Spring Data JPA repository for the Customer entity, which has a primary key of type Long.
    @Query("SELECT c FROM Customer c WHERE c.cusEmail = :email")  //method queries the database to find a list of Customer entities based on their email address.
    List<Customer> findByCusEmail(String email);
    Optional<Customer> findByCusMobile(String mobile);  //Customer entity by searching for a specific mobile number.

    boolean existsByCusMobile(String cusMobile); // Checks if a Customer with the given mobile number exists.

    boolean existsByCusMobileAndCusIdNot(String cusMobile, Long cusId);

    @Query("SELECT c.cusEmail FROM Customer c")//Retrieves a list of all customer email addresses.
    List<String> findAllEmails();

}
