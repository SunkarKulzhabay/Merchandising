package com.merch.userservice.controller;

import com.merch.userservice.entity.Schedule;
import com.merch.userservice.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createSchedule(@RequestBody Schedule schedule) {
        Schedule savedSchedule = scheduleService.createSchedule(schedule);
        return ResponseEntity.ok(savedSchedule);
    }

    @GetMapping("/{dayOfWeek}")
    @PreAuthorize("hasRole('MERCHANDISER')")
    public ResponseEntity<?> getSchedules(@PathVariable String dayOfWeek) {
        DayOfWeek dow = DayOfWeek.valueOf(dayOfWeek.toUpperCase());
        return ResponseEntity.ok(scheduleService.getSchedulesForDay(dow));
    }
}