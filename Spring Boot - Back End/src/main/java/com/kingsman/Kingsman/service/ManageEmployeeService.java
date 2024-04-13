package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.repository.ManageEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManageEmployeeService {
    @Autowired
    private ManageEmployeeRepository manageEmployeeRepository;

    public List<Employee> getAllEmployees() {
        return manageEmployeeRepository.findAll();
    }

}
