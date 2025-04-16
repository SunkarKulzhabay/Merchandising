package com.merch.userservice.controller;

import com.merch.userservice.dto.RegisterRequest;
import com.merch.userservice.model.User;
import com.merch.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User created = userService.register(request);
        return ResponseEntity.ok(created);
    }
}
