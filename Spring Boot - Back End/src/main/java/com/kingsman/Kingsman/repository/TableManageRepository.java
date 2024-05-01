package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.TableManage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableManageRepository extends JpaRepository<TableManage,Long> {

    boolean existsByTableNumber(int tableNumber);
}
