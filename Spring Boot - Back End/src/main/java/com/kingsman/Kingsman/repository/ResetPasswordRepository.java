package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetPasswordRepository extends JpaRepository<Employee, Integer> {
    Employee findByUsername(String username);
    Employee save(Employee employee);
}
