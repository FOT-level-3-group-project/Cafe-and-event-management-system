package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.InventoryItem;
import com.kingsman.Kingsman.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

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
            existingItem.setWeight(updatedItem.getWeight());
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
}
