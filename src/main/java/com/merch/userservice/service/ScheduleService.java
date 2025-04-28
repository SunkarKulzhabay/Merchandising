package com.merch.userservice.service;

import com.merch.userservice.entity.Schedule;
import com.merch.userservice.entity.Task;
import com.merch.userservice.entity.User;
import com.merch.userservice.repository.ScheduleRepository;
import com.merch.userservice.repository.TaskRepository;
import com.merch.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Schedule createSchedule(Schedule schedule) {
        if (schedule.getRepeatUntil() != null && schedule.getRepeatUntil().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Repeat until date cannot be in the past");
        }
        Schedule savedSchedule = scheduleRepository.save(schedule);
        if (savedSchedule.getRepeatUntil() != null) {
            LocalDate currentDate = LocalDate.now();
            while (!currentDate.isAfter(savedSchedule.getRepeatUntil())) {
                if (savedSchedule.getDaysOfWeek().contains(currentDate.getDayOfWeek())) {
                    Task task = new Task();
                    task.setSchedule(savedSchedule);
                    task.setDate(currentDate);
                    task.setCompleted(false);
                    taskRepository.save(task);
                }
                currentDate = currentDate.plusDays(1);
            }
        }
        return savedSchedule;
    }

    public List<Schedule> getSchedulesForDay(DayOfWeek dayOfWeek) {
        return scheduleRepository.findByDayOfWeek(dayOfWeek);
    }

    public Task completeTask(Task task, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public List<Task> getTasksForMerchandiser(String username, LocalDate date) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return taskRepository.findByUserIdAndDate(user.getId(), date);
    }
}