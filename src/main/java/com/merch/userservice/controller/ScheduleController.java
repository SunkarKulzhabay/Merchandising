package com.merch.userservice.controller;

import com.merch.userservice.entity.Schedule;
import com.merch.userservice.entity.Store;
import com.merch.userservice.entity.User;
import com.merch.userservice.model.Role;
import com.merch.userservice.repository.StoreRepository;
import com.merch.userservice.repository.UserRepository;
import com.merch.userservice.service.ScheduleService;

import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private static final Logger logger = LoggerFactory.getLogger(ScheduleController.class);

    public ScheduleController(ScheduleService scheduleService, UserRepository userRepository, StoreRepository storeRepository) {
        this.scheduleService = scheduleService;
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSchedule(@Valid @RequestBody ScheduleRequest request) {
        logger.info("User: {}, Authorities: {}",
                SecurityContextHolder.getContext().getAuthentication().getName(),
                SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        logger.info("Creating schedule for storeId: {}, userId: {}", request.getStoreId(), request.getUserId());

        Optional<Store> storeOpt = storeRepository.findById(request.getStoreId());
        if (storeOpt.isEmpty()) {
            logger.warn("Invalid store ID: {}", request.getStoreId());
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
            if (userOpt.isEmpty() || userOpt.get().getRole() != Role.MERCHANDISER) {
                logger.warn("Invalid merchandiser ID: {}", request.getUserId());
                return ResponseEntity.badRequest().body("Invalid merchandiser ID");
            }
            schedule.setMerchandiser(userOpt.get());
        }

        try {
            Schedule savedSchedule = scheduleService.createSchedule(schedule);
            logger.info("Schedule created: {}", savedSchedule);
            return ResponseEntity.ok(savedSchedule);
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid schedule data: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error saving schedule: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating schedule: " + e.getMessage());
        }
    }
}

class ScheduleRequest {
    @NotNull(message = "Store ID is required")
    private Long storeId;
    private List<String> daysOfWeek;
    private boolean requiresCashRegisterPhoto;
    private boolean requiresMainZonePhoto;
    private LocalDate repeatUntil;
    private Long userId;

    public Long getStoreId() { return storeId; }
    public void setStoreId(Long storeId) { this.storeId = storeId; }
    public List<String> getDaysOfWeek() { return daysOfWeek; }
    public void setDaysOfWeek(List<String> daysOfWeek) { this.daysOfWeek = daysOfWeek; }
    public boolean isRequiresCashRegisterPhoto() { return requiresCashRegisterPhoto; }
    public void setRequiresCashRegisterPhoto(boolean requiresCashRegisterPhoto) { this.requiresCashRegisterPhoto = requiresCashRegisterPhoto; }
    public boolean isRequiresMainZonePhoto() { return requiresMainZonePhoto; }
    public void setRequiresMainZonePhoto(boolean requiresMainZonePhoto) { this.requiresMainZonePhoto = requiresMainZonePhoto; }
    public LocalDate getRepeatUntil() { return repeatUntil; }
    public void setRepeatUntil(LocalDate repeatUntil) { this.repeatUntil = repeatUntil; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}