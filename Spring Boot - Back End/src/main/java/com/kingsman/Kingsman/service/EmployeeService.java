package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee updateEmployee(Integer id, Employee updateEmployee) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);

        if(existingEmployee != null){
            existingEmployee.setFirst_name(updateEmployee.getFirst_name());
            existingEmployee.setEmail(updateEmployee.getEmail());
            existingEmployee.setLast_name(updateEmployee.getLast_name());
            existingEmployee.setProfilePicture(updateEmployee.getProfilePicture());
            existingEmployee.setPassword(updateEmployee.getPassword());

            return employeeRepository.save(existingEmployee);

        }else {
            return  null;
        }
    }


}
