package com.merch.userservice.service;

import com.merch.userservice.dto.RegisterRequest;
import com.merch.userservice.model.Role;
import com.merch.userservice.model.User;
import com.merch.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(Role.valueOf(request.getRole().toUpperCase()))
                .build();
        return userRepository.save(user);
    }

    // для логина и аутентификации логика будет через Spring Security
}
