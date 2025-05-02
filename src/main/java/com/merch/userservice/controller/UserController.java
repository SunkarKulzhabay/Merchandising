package com.merch.userservice.controller;

import com.merch.userservice.entity.User;
import com.merch.userservice.model.Role;
import com.merch.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/merchandisers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getMerchandisers() {
        List<User> merchandisers = userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.MERCHANDISER)
                .collect(Collectors.toList());
        return ResponseEntity.ok(merchandisers);
    }
}