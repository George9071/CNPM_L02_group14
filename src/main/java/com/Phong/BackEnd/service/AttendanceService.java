package com.Phong.BackEnd.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Phong.BackEnd.entity.attendance.Attendance;
import com.Phong.BackEnd.entity.attendance.Type;
import com.Phong.BackEnd.entity.personel.Employee;
import com.Phong.BackEnd.exception.AppException;
import com.Phong.BackEnd.exception.ErrorCode;
import com.Phong.BackEnd.repository.AttendanceRepository;
import com.Phong.BackEnd.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Transactional
    public Attendance checkIn(Long employeeId) {
        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
        LocalDate today = LocalDate.now();
        Optional<Attendance> existingAttendance = attendanceRepository.findByEmployeeAndDate(employee, today);
        if (existingAttendance.isPresent()) {
            throw new AppException(ErrorCode.ALREADY_CHECKED_IN);
        }
        Attendance attendance = Attendance.builder()
                .employee(employee)
                .date(today)
                .checkInTime(LocalDateTime.now())
                .type(Type.CHECK_IN)
                .build();
        attendanceRepository.save(attendance);
        return attendance;
    }

    @Transactional
    public Attendance checkOut(Long employeeId) {
        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
        LocalDate today = LocalDate.now();
        Attendance attendance = attendanceRepository
                .findByEmployeeAndDate(employee, today)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_CHECKED_IN));

        if (attendance.getCheckOutTime() != null) {
            throw new AppException(ErrorCode.ALREADY_CHECKED_OUT);
        }

        attendance.setCheckOutTime(LocalDateTime.now());
        attendance.updateDuration();
        attendance.setType(Type.CHECK_OUT);

        return attendanceRepository.save(attendance);
    }

    public String getWorkingDurationForToday(Long employeeId) {
        Employee employee = employeeRepository
                .findById(employeeId)
                .orElseThrow(() -> new AppException(ErrorCode.EMPLOYEE_NOT_FOUND));
        LocalDate today = LocalDate.now();
        Attendance attendance = attendanceRepository
                .findByEmployeeAndDate(employee, today)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_CHECKED_IN));

        if (attendance.getDuration() != null) {
            return attendance.getDuration();
        }
        throw new AppException(ErrorCode.DURATION_CALCULATION_ERROR);
    }
}