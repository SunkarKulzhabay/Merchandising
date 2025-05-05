package com.merch.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Set;

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
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "schedule_days", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "day_of_week")
    private Set<DayOfWeek> daysOfWeek;

    @Column(name = "requires_cash_register_photo")
    private boolean requiresCashRegisterPhoto;

    @Column(name = "requires_main_zone_photo")
    private boolean requiresMainZonePhoto;

    @Column(name = "repeat_until")
    private LocalDate repeatUntil;
}