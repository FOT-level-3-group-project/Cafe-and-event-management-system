package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.exception.UserNotFoundException;
import com.kingsman.Kingsman.model.Customer;
import com.kingsman.Kingsman.repository.CustomerRepository;
import com.kingsman.Kingsman.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/customers")

public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CustomerRepository customerRepository;
    @PostMapping("/add") //Add customer date into table
    public ResponseEntity<String> addCustomer(@RequestBody Customer cus){
        customerService.addCustomer(cus);
        return ResponseEntity.ok("Customer details added sussessfully");



    }

    @GetMapping("/viewCustomer")
    public List<Customer> getCustomer() {
        return customerRepository.findAll();
    }

    @GetMapping("/{cusId}")
    public Customer getCustomerById(@PathVariable Long cusId) {
        return customerRepository.findById(cusId)
                .orElseThrow(() -> new UserNotFoundException(cusId));
    }

    @PutMapping("/{cusId}")
    Customer updateCustomer(@RequestBody Customer newCustomer, @PathVariable Long cusId) {
        return customerRepository.findById(cusId)
                .map(customer -> {
                    customer.setCusName(newCustomer.getCusName());
                    customer.setCusEmail(newCustomer.getCusEmail());
                    customer.setCusTable(newCustomer.getCusTable());
                    return customerRepository.save(customer);
                })
                .orElseThrow(() -> new UserNotFoundException(cusId));
    }

    @DeleteMapping("/{cusId}")
    String deleteUser(@PathVariable Long cusId) {
        if(!customerRepository.existsById(cusId)) {
            throw new UserNotFoundException(cusId);
        }
        customerRepository.deleteById(cusId);
        return "User with ID " + cusId + " has been deleted successfully";
    }


}

