package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.InventoryItem;
import com.kingsman.Kingsman.model.InventoryItemUsageLog;
import com.kingsman.Kingsman.model.Notification;
import com.kingsman.Kingsman.repository.InventoryItemUsageLogRepository;
import com.kingsman.Kingsman.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private InventoryItemUsageLogRepository inventoryItemUsageLogRepository;
    @Autowired
    private NotificationService notificationService;

    public void addItemInventory(InventoryItem item){

        inventoryRepository.save(item);
    }

    public List<InventoryItem> getAllInventoryItems() {
        return inventoryRepository.findAll();
    }

    public InventoryItem getInventoryItemById(long itemId) {
        return inventoryRepository.findById(itemId).orElse(null);
    }
    public boolean editInventoryItem(long itemId,InventoryItem updatedItem){
        Optional<InventoryItem> existingItemOptional = inventoryRepository.findById(itemId); //find the existing item in repo using Id

        if(existingItemOptional.isPresent()){
            InventoryItem existingItem = existingItemOptional.get(); //get existing data in found Id

            //existingItem.setItemName(updatedItem.getItemName());
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setVendorId(updatedItem.getVendorId());
            existingItem.setLastModified(LocalDateTime.now()); //save modified data in repo
            inventoryRepository.save(existingItem);

            return true;

        }else{
            return false;
        }

    }

    public boolean deleteInventoryItemById(long itemId) {
        if (inventoryRepository.existsById(itemId)){ //check the data are in the repo related the Id
            inventoryRepository.deleteById(itemId);
            return true;
        }else{
            return false;
        }
    }

    public boolean useInventoryItem(long itemId, int quantity) {
        Optional<InventoryItem> existingItemOptional = inventoryRepository.findById(itemId); //find the existing item in repo using Id
        if(existingItemOptional.isPresent()){
            InventoryItem existingItem = existingItemOptional.get();

            Long currentQuantity = existingItem.getQuantity();//get quantity in existing item
            if (currentQuantity >= quantity){
                existingItem.setQuantity(currentQuantity-quantity); //decrease quantity

                existingItem.setLastDailyUsage(LocalDateTime.now());

                inventoryRepository.save(existingItem); //save updated Item to repo

                //add data to the Inventory_usage_log table
                InventoryItemUsageLog inventoryItemUsageLog = new InventoryItemUsageLog();
                inventoryItemUsageLog.setItemId(existingItem.getId());
                inventoryItemUsageLog.setItemName(existingItem.getItemName());
                inventoryItemUsageLog.setDecreasedQuantity((long) quantity);
                inventoryItemUsageLog.setUsageDateTime(LocalDateTime.now());
                inventoryItemUsageLog.setUnit(existingItem.getUnit());

                //Manager method for crate the notification when inventory use
                createInventoryNotificationForManager(inventoryItemUsageLog);

                inventoryItemUsageLogRepository.save(inventoryItemUsageLog);

                return true;
            }

        }
        return false;
    }

    private void createInventoryNotificationForManager(InventoryItemUsageLog inventoryItemUsageLog){
        String title = "Inventory Usage";
        boolean isRead = false;
        // Format the usageDateTime to extract only the time
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        String usageTime = inventoryItemUsageLog.getUsageDateTime().format(timeFormatter);

        String message = inventoryItemUsageLog.getDecreasedQuantity() +" "+ inventoryItemUsageLog.getUnit() + " are used in " + inventoryItemUsageLog.getItemName() + " at "+ usageTime;
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDateTime updatedAt = createdAt;
        String forWho = "manager";
        Notification notification = new Notification(title, message, isRead, createdAt, updatedAt, forWho);
        notificationService.createNotification(notification);
    }

    public List<InventoryItemUsageLog> getInventoryUsageForDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        return inventoryItemUsageLogRepository.findByUsageDateTimeBetween(startOfDay,endOfDay);
    }
}
