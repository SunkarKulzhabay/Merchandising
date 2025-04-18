package com.merch.userservice.service;

import com.merch.userservice.entity.Store;
import com.merch.userservice.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    public List<Store> getAllStores() {
        return storeRepository.findAll(); // Получаем все торговые точки
    }

    public void addStore(String name) {
        Store store = new Store(name); // Создаем новую точку
        storeRepository.save(store); // Сохраняем в базу данных
    }
    public void deleteStoreById(Long id) {
        storeRepository.deleteById(id);
    }

}
