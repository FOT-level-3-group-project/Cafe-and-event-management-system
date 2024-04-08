package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Column(name = "customer_id")
    private Long customerId;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @Column(nullable = false)
    private Date orderDateTime;

    @Column(nullable = false)
    private String orderStatus;

    @Column(nullable = false)
    private int tableNumber;

    @Column(nullable = false)
    private double subTotal;

    @Column(nullable = false)
    private double discountValue;

    @Column(nullable = false)
    private double discountPercentage;

    @Column(nullable = false)
    private double totalAfterDiscount;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private boolean paymentStatus;

    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;

    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
        updatedDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDate = new Date();
    }

    public Order() {
    }
}
