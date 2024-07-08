package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.Notification;
import com.kingsman.Kingsman.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Long id) {
        Optional<Notification> notification = notificationRepository.findById(id);
        return notification.orElse(null); // or throw an exception if preferred
    }

    public List<Notification> getNotificationsByForWho(String forWho) {
        return notificationRepository.findByForWho(forWho);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification updateNotification(Long id, Notification notificationDetails) {
        Optional<Notification> optionalNotification = notificationRepository.findById(id);
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setTitle(notificationDetails.getTitle());
            notification.setMessage(notificationDetails.getMessage());
            notification.setRead(notificationDetails.isRead());
            notification.setUpdatedAt(notificationDetails.getUpdatedAt());
            notification.setForWho(notificationDetails.getForWho());
            return notificationRepository.save(notification);
        }
        return null; // Or throw an exception
    }

    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
