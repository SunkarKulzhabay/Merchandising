package com.merch.userservice.controller;

import com.merch.userservice.entity.User;
import com.merch.userservice.entity.Store;
import com.merch.userservice.repository.UserRepository;
import com.merch.userservice.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DataController {
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/stores")
    @PreAuthorize("hasAnyRole('ADMIN', 'MERCHANDISER')")
    public ResponseEntity<List<Store>> getAllStores() {
        return ResponseEntity.ok(storeRepository.findAll());
    }
}