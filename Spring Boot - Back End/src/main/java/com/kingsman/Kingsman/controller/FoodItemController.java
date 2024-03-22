package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Customer;
import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/food")

public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @PostMapping("/add") //add food item to the table
    public ResponseEntity<String> addFoodItem(@RequestBody FoodItem foodItem) {
        foodItemService.saveFoodItem(foodItem);
        return ResponseEntity.ok("Food Item Added Successfully");
    }
    @GetMapping("/categories")//get categories in item table
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = foodItemService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

//    @GetMapping("/{category}") // Get items by category
//    public List<FoodItem> getItemsByCategory(@PathVariable String category) {
//        return foodItemService.getItemsByCategory(category);
//    }


    @GetMapping("/{category}") // Get items by category
    public List<String> getFoodNamesByCategory(@PathVariable String category) {
        List<FoodItem> foodItems = foodItemService.getItemsByCategory(category);
        List<String> foodNames = new ArrayList<>();
        for (FoodItem foodItem : foodItems) {
            foodNames.add(foodItem.getFoodName());
        }
        return foodNames;
    }



}
