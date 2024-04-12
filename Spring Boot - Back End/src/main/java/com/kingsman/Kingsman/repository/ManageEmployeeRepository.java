package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageEmployeeRepository extends JpaRepository<Employee, Integer> {
    boolean existsByUsername(String username);
    void deleteById(Integer id);
}
