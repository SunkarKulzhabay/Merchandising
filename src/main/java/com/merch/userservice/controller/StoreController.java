package com.merch.userservice.controller;
import com.merch.userservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping("/stores")
    @PreAuthorize("hasRole('ADMIN')")
    public String getStores(Model model) {
        model.addAttribute("stores", storeService.getAllStores());
        return "stores";
    }

    @PostMapping("/add-store")
    @PreAuthorize("hasRole('ADMIN')")
    public String addStore(@RequestParam String name) {
        storeService.addStore(name);
        return "redirect:/stores";
    }

    @PostMapping("/delete-store")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteStore(@RequestParam Long id) {
        storeService.deleteStoreById(id);
        return "redirect:/stores";
    }
}
