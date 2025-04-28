package com.merch.userservice.repository;

import com.merch.userservice.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.DayOfWeek;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT s FROM Schedule s JOIN s.daysOfWeek d WHERE d = :dayOfWeek")
    List<Schedule> findByDayOfWeek(DayOfWeek dayOfWeek);
}