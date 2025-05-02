package com.merch.userservice.config;

import com.merch.userservice.entity.Store;
import com.merch.userservice.entity.User;
import com.merch.userservice.model.Role;
import com.merch.userservice.repository.StoreRepository;
import com.merch.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Администратор
            if (!userRepository.findByUsername("admin").isPresent()) {
                User admin = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("password"))
                        .fullName("Admin User")
                        .role(Role.ADMIN)
                        .build();
                userRepository.save(admin);
                System.out.println("Admin user created: username=admin, password=password");
            }

            // Мерчандайзер
            if (!userRepository.findByUsername("merchandiser").isPresent()) {
                User merchandiser = User.builder()
                        .username("merchandiser")
                        .password(passwordEncoder.encode("password"))
                        .fullName("Merchandiser User")
                        .role(Role.MERCHANDISER)
                        .build();
                userRepository.save(merchandiser);
                System.out.println("Merchandiser user created: username=merchandiser, password=password");
            }

            // Магазин
            if (storeRepository.findById(1L).isEmpty()) {
                Store store = new Store();
                store.setId(1L);
                store.setName("Test Store");
                storeRepository.save(store);
                System.out.println("Store created: id=1, name=Test Store");
            }
        };
    }
}