package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Customer;
import com.kingsman.Kingsman.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public void addCustomer(Customer cus){

        customerRepository.save(cus);
    }
}
