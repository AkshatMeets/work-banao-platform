package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.workbanao.workbanao_backend.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User registered = userService.registerUser(user);
        return new ResponseEntity<>(registered, HttpStatus.CREATED);
    }

    public ResponseEntity<User> getByEmail(@PathVariable String email){
        return userService.findByEmail(email)
                .map(user -> new ResponseEntity<>(user,HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
