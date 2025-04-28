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
        return storeRepository.findAll();
    }

    public void addStore(String name) {
        try {
            Store store = new Store(name);
            System.out.println("Сохраняем магазин: " + name);
            storeRepository.save(store);
            System.out.println("Магазин успешно сохранен: " + name);
        } catch (Exception e) {
            System.err.println("Ошибка при сохранении магазина: " + e.getMessage());
            throw new RuntimeException("Не удалось сохранить магазин: " + e.getMessage());
        }
    }

    public void deleteStoreById(Long id) {
        try {
            if (storeRepository.existsById(id)) {
                storeRepository.deleteById(id);
            } else {
                throw new IllegalArgumentException("Магазин с ID " + id + " не найден");
            }
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Магазин не найден для ID " + id);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка при удалении магазина с ID " + id, e);
        }
    }
}