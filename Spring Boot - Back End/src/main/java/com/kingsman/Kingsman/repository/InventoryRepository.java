package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryItem,Long> {
}
