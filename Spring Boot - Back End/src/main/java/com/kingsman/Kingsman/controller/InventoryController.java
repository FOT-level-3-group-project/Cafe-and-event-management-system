package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.InventoryItem;
import com.kingsman.Kingsman.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/add")
    public ResponseEntity<String> addItemToInventory(@RequestBody InventoryItem item) {
        inventoryService.addItemInventory(item);
        return ResponseEntity.ok("Item added to inventory successfully");
    }
}
