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
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<CustomerDTO> findAllWithEmployeeDetails() {
        return customerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<CustomerDTO> findByEmail(String email) {
        return customerRepository.findByCusEmail(email)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
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
        validateCustomer(customerDTO,  "Create");
        Customer customer = convertToEntity(customerDTO);
        LocalDateTime now = LocalDateTime.now();
        customer.setAddedDate(now);
        customer.setUpdatedDate(now);
        return convertToDTO(customerRepository.save(customer));
    }

    public CustomerDTO update(Long id, CustomerDTO customerDTO) {
        validateCustomer(customerDTO, "Update");
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

    private void validateCustomer(CustomerDTO customerDTO, String processType) {
        String email = customerDTO.getCusEmail();
        String mobileNumber = customerDTO.getCusMobile();
        Long customerId = customerDTO.getCusId();

        if (email != null && !email.isEmpty() && !isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format: " + email);
        }

        if (!isValidMobileNumber(mobileNumber)) {
            throw new IllegalArgumentException("Invalid mobile number: " + mobileNumber);
        }

        if (customerRepository.existsByCusMobile(mobileNumber) && Objects.equals(processType, "Create")) {
            throw new CustomerDuplicateMobileNumberException("Mobile number already exists: " + mobileNumber);
        }

        if (customerRepository.existsByCusMobileAndCusIdNot(mobileNumber, customerId) && Objects.equals(processType, "Update")){
            throw new CustomerDuplicateMobileNumberException("Mobile number already exists: " + mobileNumber);
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    private boolean isValidMobileNumber(String mobileNumber) {
        return mobileNumber.length() == 10 && mobileNumber.matches("\\d+");
    }

    private CustomerDTO convertToDTO(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        BeanUtils.copyProperties(customer, customerDTO);
        customerDTO.setEmployeeId(customer.getEmployee().getId());
        return customerDTO;
    }

    private Customer convertToEntity(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO, customer);

        Employee employee = new Employee();
        employee.setId(customerDTO.getEmployeeId());
        customer.setEmployee(employee);

        return customer;
    }
}
