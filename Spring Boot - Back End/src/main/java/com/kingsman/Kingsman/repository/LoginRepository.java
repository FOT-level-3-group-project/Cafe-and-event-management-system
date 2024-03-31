package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Employee, Integer> {
    Employee findByUsernameAndPassword(String username, String password);

}
