package com.merch.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "cash_register_count")
    private int cashRegisterCount;

    @Column(name = "cash_register_photo_url")
    private String cashRegisterPhotoUrl;

    @Column(name = "main_zone_photo_url")
    private String mainZonePhotoUrl;

    @Column(name = "comment")
    private String comment;

    @Column(name = "completed")
    private boolean completed;
}