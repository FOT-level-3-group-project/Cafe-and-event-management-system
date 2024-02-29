package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.InventoryItemUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryItemUsageLogRepository extends JpaRepository<InventoryItemUsageLog, Long> {
}
