package com.merch.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @ElementCollection
    @CollectionTable(name = "schedules_days_of_week", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "day_of_week")
    private List<String> daysOfWeek;

    @Column(name = "requires_cash_register_photo")
    private boolean requiresCashRegisterPhoto;

    @Column(name = "requires_main_zone_photo")
    private boolean requiresMainZonePhoto;

    @Column(name = "repeat_until")
    private LocalDate repeatUntil;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User merchandiser;
}