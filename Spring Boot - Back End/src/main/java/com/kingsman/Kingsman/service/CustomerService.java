
package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.dto.CustomerDTO;
import com.kingsman.Kingsman.exception.CustomerDuplicateMobileNumberException;
import com.kingsman.Kingsman.model.Customer;
import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<CustomerDTO> findAllWithEmployeeName() {
        return customerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CustomerDTO findByEmail(String email) {
        return customerRepository.findByCusEmail(email)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public CustomerDTO findByMobile(String mobile) {
        return customerRepository.findByCusMobile(mobile)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public CustomerDTO findById(Long id) {
        return customerRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public CustomerDTO create(CustomerDTO customerDTO) {
        if (customerRepository.existsByCusMobile(customerDTO.getCusMobile())) {
            throw new CustomerDuplicateMobileNumberException("Mobile number already exists: " + customerDTO.getCusMobile());
        }
        Customer customer = convertToEntity(customerDTO);
        customer.setAddedDate(LocalDateTime.now());
        return convertToDTO(customerRepository.save(customer));
    }

    public CustomerDTO update(Long id, CustomerDTO customerDTO) {
        String mobileNumber = customerDTO.getCusMobile();
        Optional<Customer> existingCustomerWithMobile = customerRepository.findByCusMobile(mobileNumber);
        if (existingCustomerWithMobile.isPresent() && !existingCustomerWithMobile.get().getCusId().equals(id)) {
            throw new CustomerDuplicateMobileNumberException("Mobile number already exists: " + mobileNumber);
        }

        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer existingCustomer = optionalCustomer.get();
            BeanUtils.copyProperties(customerDTO, existingCustomer, "addedDate");
            existingCustomer.setCusId(id);
            existingCustomer.setUpdatedDate(LocalDateTime.now());
            return convertToDTO(customerRepository.save(existingCustomer));
        }
        return null;
    }

    public void delete(Long id) {
        customerRepository.deleteById(id);
    }

    private CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        BeanUtils.copyProperties(customer, customerDTO);
        customerDTO.setEmployee_id((int) customer.getEmployee().getId().longValue());
        return customerDTO;
    }

    private Customer convertToEntity(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO, customer);

        Employee employee = new Employee();
        employee.setId(customerDTO.getEmployee_id());
        customer.setEmployee(employee);

        return customer;
    }
}
