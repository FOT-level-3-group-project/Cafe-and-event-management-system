package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.exception.ItemNotFoundExeption;
import com.kingsman.Kingsman.model.FoodItem;
import com.kingsman.Kingsman.model.InventoryItem;
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

@RestController                                                                                      // connect to ApI/UI
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/food")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;
    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/add")//Adding a Food Item
    public ResponseEntity<FoodItem> addFoodItem(@RequestBody FoodItem foodItem) {                    //FoodItem MODel created fooditem object put front end data to this object
        FoodItem savedFoodItem = foodItemService.saveFoodItem(foodItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFoodItem);                        // Http response status
    }

    @GetMapping("/categories") //method retrieves a list of food categories.
    public ResponseEntity<List<String>> getAllCategories() {                                          // created list
        List<String> categories = foodItemService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{category}") //Getting Items by Category, retrieves food items based on a specified category.
    public ResponseEntity<List<FoodItem>> getItemsByCategory(@PathVariable String category) {        // get path example related category
        List<FoodItem> items = foodItemService.getItemsByCategory(category);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/all") //get all the food item
    public ResponseEntity<List<FoodItem>> getAllItems() {
        List<FoodItem> items = foodItemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}") //method removes a food item based on its ID.
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

    @PostMapping("/upload-image/{foodId}") //update food Item image by foodId
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

    @PutMapping("/edit/{foodId}") //edit food item by Id
    public ResponseEntity<String> editFoodItem(@PathVariable long foodId, @RequestBody FoodItem updateFood){
        if(foodItemService.editFoodItem(foodId,updateFood)){
            return ResponseEntity.ok("Food Item Updated Successfully");
        }else {
            throw new ItemNotFoundExeption(foodId); //throw exception
            //return ResponseEntity.notFound().build();
        }
    }




}
