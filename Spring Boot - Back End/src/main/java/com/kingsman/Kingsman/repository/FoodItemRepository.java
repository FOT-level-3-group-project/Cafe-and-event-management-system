package com.kingsman.Kingsman.repository;

import com.kingsman.Kingsman.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem,Long> {
    @Query("select distinct f.foodCategory from FoodItem f")
    List<String>findAllCategories();

    List<FoodItem>findByfoodCategory(String foodCategory);
}
