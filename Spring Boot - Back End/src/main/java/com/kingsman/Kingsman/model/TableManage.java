package com.kingsman.Kingsman.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TableManage {
    @Id
    Long id;
    int tableNumber;
    boolean tableAvailability;
}
