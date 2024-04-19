package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Employee;
import com.kingsman.Kingsman.model.InAttendance;
import com.kingsman.Kingsman.repository.EmployeeRepository;
import com.kingsman.Kingsman.repository.InAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

//Absent Employees
    @Autowired
    private InAttendanceRepository inAttendanceRepository;

    public List<Map<String, String>> findEmployeesNotInAttendanceToday() {
        // Get current date
        LocalDate currentDate = LocalDate.now();

        // Fetch all employees
        List<Employee> allEmployees = employeeRepository.findAll();

        // Fetch employees present in InAttendance table for the current date
        List<InAttendance> employeesInAttendance = inAttendanceRepository.findByDate(currentDate);

        // Extract empIds from employeesInAttendance
        List<String> empIdsInAttendance = employeesInAttendance.stream()
                .map(InAttendance::getEmpId)
                .collect(Collectors.toList());

        // Filter out employees whose empIds are not in employeesInAttendance
        List<Employee> employeesNotInAttendance = allEmployees.stream()
                .filter(employee -> !empIdsInAttendance.contains("EMP0" + String.format("%02d", employee.getId())))
                .collect(Collectors.toList());

        // Create a list of maps containing employee id and position
        List<Map<String, String>> employeesWithPositions = employeesNotInAttendance.stream()
                .map(employee -> Map.of("empId", "EMP0" + String.format("%02d", employee.getId()), "position", employee.getPosition()))
                .collect(Collectors.toList());

        return employeesWithPositions;
    }



}
