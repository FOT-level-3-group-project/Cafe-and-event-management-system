package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.model.InventoryItem;
import com.kingsman.Kingsman.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public FoodItem saveFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public List<String> getAllCategories() {
        return foodItemRepository.findAllCategories();
    }

    public List<FoodItem> getItemsByCategory(String category) {
        return foodItemRepository.findByFoodCategory(category);
    }

    public List<FoodItem> getAllItems() {
        return foodItemRepository.findAll();
    }

    public void deleteFoodItem(Long foodItemId) {
        foodItemRepository.deleteById(foodItemId);
    }


    public Optional<FoodItem> getFoodNameById(Long foodItemId) {
        return foodItemRepository.findById(foodItemId);
    }

    public boolean updateFoodAvailability(long foodId){
        Optional<FoodItem> existingFoodItemOptional = foodItemRepository.findById(foodId);
        if(existingFoodItemOptional.isPresent()){
            FoodItem existingFoodItem = existingFoodItemOptional.get();

            boolean newAvailability = !existingFoodItem.isAvailable(); // Toggle the availability
            existingFoodItem.setAvailable(newAvailability); // Save the updated food item
            foodItemRepository.save(existingFoodItem);
            return true;
        }
        return false;
    }

    public FoodItem getFoodItemById(Long foodId) {
        Optional<FoodItem> foodItemOptional = foodItemRepository.findById(foodId);
        return foodItemOptional.orElse(null);
    }

    public boolean editFoodItem(long foodId, FoodItem updatedFood){
        Optional<FoodItem> existingItemOptional = foodItemRepository.findById(foodId); //find the existing Food item in repo using Id

        FoodItem existingItem = existingItemOptional.get();

        existingItem.setFoodName(updatedFood.getFoodName());
        existingItem.setFoodPrice(updatedFood.getFoodPrice());
        foodItemRepository.save(existingItem);

        if (existingItemOptional.isPresent()) {

            return true;
        }else {
            return false;
        }
    }


}
