package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnCloudPlatform;

@Entity
@Getter
@Setter
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cusId;
    private String cusName;
    private String cusEmail;
    private int cusTable;

    public Customer(Long customerId) {
        cusId = customerId;
    }

    public Customer() {

    }
}
