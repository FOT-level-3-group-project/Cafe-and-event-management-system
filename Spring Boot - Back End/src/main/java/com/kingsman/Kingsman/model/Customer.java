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
@Table(name = "customer")
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

    @Column(name = "added_date", nullable = false, updatable = false)
    private LocalDateTime addedDate;

    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    @PrePersist
    protected void onCreate() {
        addedDate = LocalDateTime.now();
        updatedDate = addedDate;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDate = LocalDateTime.now();
    }

    public Customer(Long customerId) {
        cusId = customerId;
    }

    public Customer() {

    }
}
