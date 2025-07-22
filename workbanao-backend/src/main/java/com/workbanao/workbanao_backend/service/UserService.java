package com.workbanao.workbanao_backend.service;

import com.workbanao.workbanao_backend.entity.User;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> findByEmail(String email);
}
