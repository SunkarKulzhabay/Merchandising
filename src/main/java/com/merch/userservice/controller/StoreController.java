package com.merch.userservice.controller;

import com.merch.userservice.entity.Store;
import com.merch.userservice.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService; // Сервис для работы с торговыми точками

    // Страница с торговыми точками
    @GetMapping("/stores")
    public String getStores(Model model) {
        model.addAttribute("stores", storeService.getAllStores()); // Передаем список торговых точек
        return "stores"; // Имя шаблона Thymeleaf
    }

    // Добавление новой торговой точки
    @PostMapping("/add-store")
    public String addStore(@RequestParam String name) {
        storeService.addStore(name); // Добавление новой торговой точки через сервис
        return "redirect:/stores"; // Перенаправление на страницу с торговыми точками
    }
}
