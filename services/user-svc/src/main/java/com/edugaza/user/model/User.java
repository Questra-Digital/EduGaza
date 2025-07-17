package com.edugaza.user.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class User {
    @Id
    private String email;
    private String otp;
    private long otpExpiry;
    private String refreshToken;
}
