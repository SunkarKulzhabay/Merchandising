package com.merch.userservice.controller;

import com.merch.userservice.entity.Task;
import com.merch.userservice.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final TaskRepository taskRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Task>> getReports(@RequestParam(required = false) String date) {
        if (date != null) {
            LocalDate reportDate = LocalDate.parse(date);
            return ResponseEntity.ok(taskRepository.findByDate(reportDate));
        }
        return ResponseEntity.ok(taskRepository.findAll());
    }
}