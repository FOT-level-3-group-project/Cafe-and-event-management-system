package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.FoodItem;
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
    }   //  get data from repository

    public List<FoodItem> getItemsByCategory(String category) {
        return foodItemRepository.findByFoodCategory(category);
    }

    public List<FoodItem> getAllItems() {
        return foodItemRepository.findAll();
    }

    public void deleteFoodItem(Long foodItemId) {
        foodItemRepository.deleteById(foodItemId);
    }


    public String getFoodNameById(Long foodItemId) {
        Optional<FoodItem> foodItemOptional = foodItemRepository.findById(foodItemId);
        return foodItemOptional.map(FoodItem::getFoodName).orElse(null);
    }
}
