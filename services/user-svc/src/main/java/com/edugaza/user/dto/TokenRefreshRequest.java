package com.edugaza.user.dto;

import lombok.Data;

@Data
public class TokenRefreshRequest {
    private String refreshToken;
}
