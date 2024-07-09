package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.TableManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableManageRepository extends JpaRepository<TableManage,Long> {

    boolean existsByTableNumber(int tableNumber);

    // Method to find tables based on availability
    List<TableManage> findByTableAvailability(boolean availability);
}
