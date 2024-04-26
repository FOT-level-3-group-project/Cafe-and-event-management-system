package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController                                                                                      // connect to ApI/UI
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/food")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @PostMapping("/add")                                                                           //Adding a Food Item
    public ResponseEntity<FoodItem> addFoodItem(@RequestBody FoodItem foodItem) {                    //FoodItem MODel created fooditem object put front end data to this object
        FoodItem savedFoodItem = foodItemService.saveFoodItem(foodItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFoodItem);                        // Http response status
    }

    @GetMapping("/categories")                                                                      //method retrieves a list of food categories.
    public ResponseEntity<List<String>> getAllCategories() {                                          // created list
        List<String> categories = foodItemService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{category}")                                                                     //Getting Items by Category, retrieves food items based on a specified category.
    public ResponseEntity<List<FoodItem>> getItemsByCategory(@PathVariable String category) {        // get path example related category
        List<FoodItem> items = foodItemService.getItemsByCategory(category);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/all")                                                                           //method retrieves all food items.
    public ResponseEntity<List<FoodItem>> getAllItems() {
        List<FoodItem> items = foodItemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}")                                                                       //method removes a food item based on its ID.
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }


}
