package com.merch.userservice.repository;

import com.merch.userservice.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdAndDate(Long userId, LocalDate date);
    List<Task> findByDate(LocalDate date);
}