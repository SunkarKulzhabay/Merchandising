package com.merch.userservice.controller;

import com.merch.userservice.entity.Store;
import com.merch.userservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MERCHANDISER')")
    public ResponseEntity<?> getStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addStore(@RequestBody Store store) {
        storeService.addStore(store.getName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteStore(@PathVariable Long id) {
        storeService.deleteStoreById(id);
        return ResponseEntity.ok().build();
    }
}