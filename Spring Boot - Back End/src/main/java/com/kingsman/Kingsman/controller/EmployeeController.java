package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PutMapping("update/{id}") // update f name ,l nam, e email, password profile picture
    public Employee updateEmployee(@PathVariable Integer id, @RequestBody Employee updatedEmployee) {
        return employeeService.updateEmployee(id, updatedEmployee);
    }

    //Absent Employees

    @GetMapping("/not-in-attendance-today")
    public List<Map<String, String>> getEmployeesNotInAttendanceToday() {
        return employeeService.findEmployeesNotInAttendanceToday();
    }

}



