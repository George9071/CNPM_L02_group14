package com.Phong.BackEnd.entity.notification;

import com.Phong.BackEnd.entity.personnel.Manager;
import com.Phong.BackEnd.entity.personnel.Personnel;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String content;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm - dd/MM/yyyy")
    LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    Manager sender;

    @OneToMany(mappedBy = "notification", cascade = CascadeType.ALL, orphanRemoval = true)
    List<NotificationStatus> notificationStatuses = new ArrayList<>();
}
