package com.edugaza.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);


    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject(subject);
        msg.setText(text);

        logger.info("Sending email:");
        logger.info("To: {}", String.join(", ", msg.getTo()));
        logger.info("Subject: {}", msg.getSubject());
        logger.info("Text: {}", msg.getText());
        mailSender.send(msg);
    }
}
