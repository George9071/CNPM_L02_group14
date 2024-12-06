package com.Phong.BackEnd.dto.response.Attendance;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {
    private long attendanceId;
    private Long employeeCode;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String duration;
    private Long employee_code;
}
