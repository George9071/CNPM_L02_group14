package com.Phong.BackEnd.dto.request.Manager;

import com.Phong.BackEnd.entity.personel.Position;
import com.Phong.BackEnd.entity.personel.Gender;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ManagerUpdateRequest {
    String email;
    String firstName;
    String lastName;
    String phone;
    String city;
    String street;
    Gender gender;
    Position position;
    Long departmentId;
}