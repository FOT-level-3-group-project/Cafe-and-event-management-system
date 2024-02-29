package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.InventoryItem;
import com.kingsman.Kingsman.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public void addItemInventory(InventoryItem item){

        inventoryRepository.save(item);
    }
}
