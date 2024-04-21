package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/food")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @PostMapping("/add")
    public ResponseEntity<FoodItem> addFoodItem(@RequestBody FoodItem foodItem) {
        FoodItem savedFoodItem = foodItemService.saveFoodItem(foodItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFoodItem);
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = foodItemService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{category}")
    public ResponseEntity<List<FoodItem>> getItemsByCategory(@PathVariable String category) {
        List<FoodItem> items = foodItemService.getItemsByCategory(category);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FoodItem>> getAllItems() {
        List<FoodItem> items = foodItemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/update-availability/{foodId}") //toggle food item availability
    public boolean updateFoodAvailability(@PathVariable Long foodId){
        return foodItemService.updateFoodAvailability(foodId);
    }
    @DeleteMapping("/delete/{foodId}")//delete food item by Id
    public ResponseEntity<String> deleteFoodItemById(@PathVariable Long foodId){
        foodItemService.deleteFoodItem(foodId);
        return ResponseEntity.ok("FoodItem Successfully Deleted");
    }

    


}
