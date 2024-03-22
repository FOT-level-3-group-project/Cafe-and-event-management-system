package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "foodItem")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    private String foodName;

    private String foodCategory;

    private double foodPrice;


    public FoodItem(Long foodItemId) {
        foodId = foodItemId;
    }

    public FoodItem() {

    }
}