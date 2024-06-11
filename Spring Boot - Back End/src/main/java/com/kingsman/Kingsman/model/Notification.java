package com.kingsman.Kingsman.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String title;

    private String message;

    private String forWho;

    @Column(name = "is_read")
    private boolean isRead;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Notification() {
    }

    public Notification(String title, String message, boolean isRead, LocalDateTime createdAt, LocalDateTime updatedAt, String forWho) {
        this.title = title;
        this.message = message;
        this.isRead = isRead;
        this.forWho = forWho;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
