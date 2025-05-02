package com.merch.userservice.controller;

import com.merch.userservice.entity.Schedule;
import com.merch.userservice.entity.Store;
import com.merch.userservice.entity.User;
import com.merch.userservice.model.Role;
import com.merch.userservice.repository.ScheduleRepository;
import com.merch.userservice.repository.StoreRepository;
import com.merch.userservice.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoreRepository storeRepository;

    private static final Logger logger = LoggerFactory.getLogger(ScheduleController.class);

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSchedule(@RequestBody ScheduleRequest request) {
        logger.info("User: {}, Authorities: {}",
                SecurityContextHolder.getContext().getAuthentication().getName(),
                SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        logger.info("Creating schedule for store: {}, user: {}", request.getStoreId(), request.getUserId());

        Optional<Store> storeOpt = storeRepository.findById(request.getStoreId());
        if (!storeOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Invalid store ID");
        }

        Schedule schedule = new Schedule();
        schedule.setStore(storeOpt.get());
        schedule.setDaysOfWeek(request.getDaysOfWeek());
        schedule.setRequiresCashRegisterPhoto(request.isRequiresCashRegisterPhoto());
        schedule.setRequiresMainZonePhoto(request.isRequiresMainZonePhoto());
        schedule.setRepeatUntil(request.getRepeatUntil());

        if (request.getUserId() != null) {
            Optional<User> userOpt = userRepository.findById(request.getUserId());
            if (userOpt.isPresent() && userOpt.get().getRole() == Role.MERCHANDISER) {
                schedule.setMerchandiser(userOpt.get());
            } else {
                return ResponseEntity.badRequest().body("Invalid merchandiser ID");
            }
        }

        Schedule savedSchedule = scheduleRepository.save(schedule);
        return ResponseEntity.ok(savedSchedule);
    }
}

class ScheduleRequest {
    private Long storeId;
    private List<String> daysOfWeek;
    private boolean requiresCashRegisterPhoto;
    private boolean requiresMainZonePhoto;
    private LocalDate repeatUntil;
    private Long userId;

    public Long getStoreId() {
        return storeId;
    }

    public void setStoreId(Long storeId) {
        this.storeId = storeId;
    }

    public List<String> getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(List<String> daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }

    public boolean isRequiresCashRegisterPhoto() {
        return requiresCashRegisterPhoto;
    }

    public void setRequiresCashRegisterPhoto(boolean requiresCashRegisterPhoto) {
        this.requiresCashRegisterPhoto = requiresCashRegisterPhoto;
    }

    public boolean isRequiresMainZonePhoto() {
        return requiresMainZonePhoto;
    }

    public void setRequiresMainZonePhoto(boolean requiresMainZonePhoto) {
        this.requiresMainZonePhoto = requiresMainZonePhoto;
    }

    public LocalDate getRepeatUntil() {
        return repeatUntil;
    }

    public void setRepeatUntil(LocalDate repeatUntil) {
        this.repeatUntil = repeatUntil;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}