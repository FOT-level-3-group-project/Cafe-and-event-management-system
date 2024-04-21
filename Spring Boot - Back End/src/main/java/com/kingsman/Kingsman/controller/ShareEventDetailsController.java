package com.kingsman.Kingsman.controller;

import com.kingsman.Kingsman.model.Event;
import com.kingsman.Kingsman.repository.ShareEventDetailsRepository;
import com.kingsman.Kingsman.service.EmailService;
import com.kingsman.Kingsman.service.ShareEventDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/inform")
public class ShareEventDetailsController {
    private final EmailService emailService;
    private final ShareEventDetailsService shareEventDetailsService;

    private final ShareEventDetailsRepository shareEventDetailsRepository;
    public ShareEventDetailsController(EmailService emailService, ShareEventDetailsService shareEventDetailsService, ShareEventDetailsRepository shareEventDetailsRepository) {
        this.emailService = emailService;
        this.shareEventDetailsService = shareEventDetailsService;
        this.shareEventDetailsRepository = shareEventDetailsRepository;
    }

    @GetMapping("/get/{eventID}")
    public Event getEventDetails(@PathVariable String eventID) {
        return shareEventDetailsService.getEventDetails(eventID);
    }

    @PostMapping("/share-event-details")
    public void shareEventDetails(@RequestBody Event event) {
        // Retrieve event details from the database
//        Event storedEvent = shareEventDetailsRepository.findByEventID(event.getEventID());
//        System.out.println(storedEvent);

        event = shareEventDetailsRepository.findByEventID(event.getEventID());
        System.out.println("Event Details: " + event.getEventName() + " " + event.getEventDate() + " " + event.getStartTime() + " " + event.getTicketPrice());

        String subject = "Invitation to " + event.getEventName();
        String message = "Dear Customer,\n" +
                "We are excited to invite you to a special event that is taking place for an engaging and memorable experience, and we would be honored to have you join us.\n" +
                "\n" +
                "Event Details:\n" +
                "Date: " + event.getEventDate() + "\n" +
                "Time: " + event.getStartTime() + "\n" +
                "Ticket Price: " + event.getTicketPrice() + "\n" + "\n" +
                "We hope to see you there!\n" + "\n" +
                "Best Regards,\n" +
                "Manager, \nKingsman Cafe and Restaurant, \nMirissa, Sri Lanka";

        for (String email : shareEventDetailsService.getCustomerEmails()) {
            try {
                emailService.sendEmail(email, subject, message);
                System.out.println("Email sent");
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println(e);
            }
        }
    }
}
