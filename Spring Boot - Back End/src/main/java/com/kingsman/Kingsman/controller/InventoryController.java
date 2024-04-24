package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.exception.ItemNotFoundExeption;
import com.kingsman.Kingsman.model.InventoryItem;
import com.kingsman.Kingsman.model.InventoryItemUsageLog;
import com.kingsman.Kingsman.service.InventoryService;
import com.sun.jdi.event.StepEvent;
import org.aspectj.apache.bcel.util.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping("/add") //add the inventory item
    public ResponseEntity<String> addItemToInventory(@RequestBody InventoryItem item) {
        inventoryService.addItemInventory(item);
        return ResponseEntity.ok("Item added to inventory successfully");
    }
    @GetMapping("/view") //view all the inventory item
    public ResponseEntity<List<InventoryItem>> viewInventory(){
        List<InventoryItem> inventoryItems = inventoryService.getAllInventoryItems();
        return ResponseEntity.ok(inventoryItems);
    }
    @GetMapping("/view/{itemId}")
    public ResponseEntity<InventoryItem> viewInventoryItemById(@PathVariable long itemId){
        InventoryItem inventoryItem = inventoryService.getInventoryItemById(itemId);
        if(inventoryItem != null){
            return ResponseEntity.ok(inventoryItem);
        }else{
            throw new ItemNotFoundExeption(itemId); //throw exception
        }
    }
    @PutMapping("/edit/{itemId}")//edit item by id
    public ResponseEntity<String> editInventoryItem(@PathVariable long itemId, @RequestBody InventoryItem updateItem){
        if(inventoryService.editInventoryItem(itemId,updateItem)){
            return ResponseEntity.ok("Inventory Item Updated Successfully");
        }else {
            throw new ItemNotFoundExeption(itemId); //throw exception
            //return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<String> deleteInventoryItem(@PathVariable long itemId){
        boolean success = inventoryService.deleteInventoryItemById(itemId);
        if(success){
            return ResponseEntity.ok("Inventory Item Successfully deleted");
        }else{
            throw new ItemNotFoundExeption(itemId);//throw exception
            //return ResponseEntity.notFound().build();
        }

    }
    @PutMapping("/use/{itemId}/{quantity}") //decrease and update the inventory and store update status in another table
    public ResponseEntity<String> useInventoryItem(@PathVariable long itemId, @PathVariable int quantity){
        boolean success = inventoryService.useInventoryItem(itemId,quantity);
        if (success){
            return ResponseEntity.ok("item used successfully");
        }else {
            throw new ItemNotFoundExeption(itemId);
        }
    }
    
    @GetMapping("/inventory-usage-log/{date}")
    public ResponseEntity<List<InventoryItemUsageLog>> getInventoryUsageLogForDate(@PathVariable @DateTimeFormat(iso =DateTimeFormat.ISO.DATE)LocalDate date){
        List<InventoryItemUsageLog> inventoryItemUsageLogs = inventoryService.getInventoryUsageForDate(date);
        return ResponseEntity.ok(inventoryItemUsageLogs);
    }

}
