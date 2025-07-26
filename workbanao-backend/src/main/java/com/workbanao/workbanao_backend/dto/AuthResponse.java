package com.workbanao.workbanao_backend.dto;

public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String role;

    // Default constructor
    public AuthResponse() {}

    // Constructor with parameters
    public AuthResponse(String accessToken, String refreshToken, String role) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.role = role;
    }

    // Getters and Setters
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
                "accessToken='" + (accessToken != null ? "***" : "null") + '\'' +
                ", refreshToken='" + (refreshToken != null ? "***" : "null") + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}