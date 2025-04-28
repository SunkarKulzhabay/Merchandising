package com.merch.userservice.controller;

import com.merch.userservice.entity.Task;
import com.merch.userservice.service.ScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private ScheduleService scheduleService;
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    @GetMapping("/merchandiser")
    @PreAuthorize("hasRole('MERCHANDISER')")
    public ResponseEntity<?> getTasks(Principal principal, @RequestParam String date) {
        logger.info("Fetching tasks for user: {}, date: {}", principal.getName(), date);
        LocalDate taskDate = LocalDate.parse(date);
        return ResponseEntity.ok(scheduleService.getTasksForMerchandiser(principal.getName(), taskDate));
    }

    @PostMapping("/complete")
    @PreAuthorize("hasRole('MERCHANDISER')")
    public ResponseEntity<?> completeTask(@RequestBody Task task, Principal principal) {
        Task completedTask = scheduleService.completeTask(task, principal.getName());
        return ResponseEntity.ok(completedTask);
    }
}