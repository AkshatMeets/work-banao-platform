package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.Security.JwtTokenUtil;
import com.workbanao.workbanao_backend.dto.AuthRequest;
import com.workbanao.workbanao_backend.dto.AuthResponse;
import com.workbanao.workbanao_backend.entity.User;
import com.workbanao.workbanao_backend.repository.UserRepository;
import com.workbanao.workbanao_backend.Security.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private CustomUserDetailService userDetailService;

    @Autowired
    private JwtTokenUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            User saved = userRepository.save(user);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Registration error: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request){
        try {
            System.out.println("Login attempt for email: " + request.getEmail());

            // Authenticate the user
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            System.out.println("Authentication successful for: " + request.getEmail());

            // Load user details
            final UserDetails userDetails = userDetailService.loadUserByUsername(request.getEmail());

            // Fetch the user to get the role and ID
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                    new RuntimeException("User not found"));

            System.out.println("User found: " + user.getEmail() + ", Role: " + user.getRole() + ", ID: " + user.getId());

            // Generate token with user ID included
            final String accessToken = jwtUtil.generateToken(userDetails.getUsername(), user.getId());

            // Generate refresh token (you can implement proper refresh token logic later)
            final String refreshToken = "dummy-refresh-token";

            // Create response
            AuthResponse response = new AuthResponse(accessToken, refreshToken, user.getRole().name());

            System.out.println("Login response created: " + response.toString());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}