package com.workbanao.workbanao_backend.service.impl;

import com.workbanao.workbanao_backend.entity.User; // ✅ Correct User import
import com.workbanao.workbanao_backend.repository.UserRepository;
import com.workbanao.workbanao_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.empty();
    }
}
