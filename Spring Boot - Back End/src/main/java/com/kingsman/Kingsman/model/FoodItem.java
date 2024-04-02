package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "food_item")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    @Column(nullable = false)
    private String foodName;

    @Column(nullable = false)
    private String foodCategory;

    @Column(nullable = false)
    private double foodPrice;

    @Column(nullable = true)
    private String foodImageURL;

    public FoodItem(Long foodItemId) {
        foodId = foodItemId;
    }

    public FoodItem() {

    }
}
