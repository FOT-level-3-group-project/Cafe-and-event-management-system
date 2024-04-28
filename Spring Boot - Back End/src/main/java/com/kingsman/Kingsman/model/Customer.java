package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@TableManage(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cusId;

    @NotNull(message = "Name is required")
    private String cusName;

    @Column(unique = true)
    @NotNull(message = "Mobile number is required")
    @Size(min = 10, max = 10, message = "Mobile number must be 10 digits")
    private String cusMobile;

    private String cusEmail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    private Employee employee;

    @Column(name = "added_date", nullable = true, updatable = false)
    private LocalDateTime addedDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {   //The onCreate method is executed before persisting a new customer. It sets the addedDate and
        addedDate = LocalDateTime.now();
        updatedDate = addedDate;
    }

    @PreUpdate
    protected void onUpdate() { //The onUpdate method is executed before updating an existing customer. It updates
        updatedDate = LocalDateTime.now();
    }

    public Customer(Long customerId) {
        cusId = customerId;
    } //When you retrieve customer data from a database or another source, you can create a Customer object by passing the existing customer’s ID

    public Customer() { //used for creating new customers

    }
}
