package com.edugaza.user.controller;

import com.edugaza.user.dto.*;
import com.edugaza.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequest request) {
        authService.sendOtp(request.getEmail());
        return ResponseEntity.ok("OTP sent");
    }

    @PostMapping("/verify")
    public ResponseEntity<TokenResponse> verifyOtp(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.verifyOtpAndLogin(request.getEmail(), request.getOtp()));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(@RequestBody TokenRefreshRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request.getRefreshToken()));
    }
}
