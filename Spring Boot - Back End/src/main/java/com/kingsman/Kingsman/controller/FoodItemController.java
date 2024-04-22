package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.service.FileStorageService;
import com.kingsman.Kingsman.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/food")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;
    @Autowired
    private FileStorageService fileStorageService;

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

    @GetMapping("/all") //get all the food item
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

    @GetMapping("/get/{foodId}") //get the food item by Id
    public ResponseEntity<FoodItem> getFoodItemById(@PathVariable Long foodId){
        Optional<FoodItem> optionalItem = foodItemService.getFoodNameById(foodId);
        if (optionalItem.isPresent()) {
            FoodItem item = optionalItem.get();
            return ResponseEntity.ok(item); // Return the item with HTTP status 200 OK
        } else {
            return ResponseEntity.notFound().build(); // Return HTTP status 404 Not Found
        }
    }

    @PostMapping("/food/upload-image/{foodId}") //update food Item image by foodId
    public ResponseEntity<String> uploadFoodItemImage(@PathVariable Long foodId, @RequestParam("file") MultipartFile file) throws IOException {
        String imageUrl = null;
        imageUrl = fileStorageService.storeFile(file);
        FoodItem foodItem = foodItemService.getFoodItemById(foodId);
        if (foodItem != null) {
            foodItem.setFoodImageURL(imageUrl);
            foodItemService.saveFoodItem(foodItem);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(imageUrl);
    }




}
