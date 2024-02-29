package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "inventory")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private float weight;
    private int quantity;
    private String vendorId;
    @Column(name = "dateAndTime")
    private LocalDateTime dateTime;
    @Column(name = "last_modified")
    private LocalDateTime lastModified;
    @PrePersist
    protected void onCreate(){
        lastModified =LocalDateTime.now();
        dateTime = LocalDateTime.now();
    }

}
