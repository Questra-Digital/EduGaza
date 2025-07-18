package com.edugaza.user.service;

import com.edugaza.user.dto.TokenResponse;
import com.edugaza.user.model.User;
import com.edugaza.user.repository.UserRepository;
import com.edugaza.user.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final JwtService jwtService;

    public void sendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        long expiry = Instant.now().plusSeconds(300).toEpochMilli(); // 5 min

        User user = userRepository.findById(email).orElse(new User());
        user.setEmail(email);
        user.setOtp(otp);
        user.setOtpExpiry(expiry);
        userRepository.save(user);

        emailService.sendEmail(email, "Your OTP Code", "Your OTP is: " + otp);
    }

    public TokenResponse verifyOtpAndLogin(String email, String otp) {
        Optional<User> optionalUser = userRepository.findById(email);
        if (optionalUser.isEmpty()) throw new RuntimeException("User not found");

        User user = optionalUser.get();
        if (!user.getOtp().equals(otp) || user.getOtpExpiry() < Instant.now().toEpochMilli()) {
            throw new RuntimeException("Invalid or expired OTP");
        }

        String accessToken = jwtService.generateToken(email);
        String refreshToken = jwtService.generateRefreshToken(email);
        user.setRefreshToken(refreshToken);
        userRepository.save(user);

        return new TokenResponse(accessToken, refreshToken, email);
    }

    public TokenResponse refreshToken(String refreshToken) {
        String email = jwtService.validateToken(refreshToken);
        User user = userRepository.findById(email).orElseThrow();

        if (!refreshToken.equals(user.getRefreshToken())) {
            throw new RuntimeException("Invalid refresh token");
        }

        String newAccessToken = jwtService.generateToken(email);
        String newRefreshToken = jwtService.generateRefreshToken(email);
        user.setRefreshToken(newRefreshToken);
        userRepository.save(user);

        return new TokenResponse(newAccessToken, newRefreshToken, email);
    }
}
