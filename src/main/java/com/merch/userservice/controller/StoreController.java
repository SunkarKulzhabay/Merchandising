package com.merch.userservice.controller;

import com.merch.userservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public ResponseEntity<?> getStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @PostMapping("/add-store")
    public ResponseEntity<?> addStore(@RequestBody Map<String, String> request) {
        try {
            String name = request.get("name");
            if (name == null || name.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Название магазина не указано"));
            }
            System.out.println("Получено название магазина: " + name);
            storeService.addStore(name);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Ошибка при добавлении магазина: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Ошибка при добавлении магазина: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStore(@PathVariable Long id) {
        try {
            storeService.deleteStoreById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Ошибка при удалении магазина"));
        }
    }
}