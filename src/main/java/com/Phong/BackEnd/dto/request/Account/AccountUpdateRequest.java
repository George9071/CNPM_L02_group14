package com.Phong.BackEnd.dto.request.Account;

import jakarta.validation.constraints.Size;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountUpdateRequest {
    String password;
    //    @DobValid(min = 18, message = "INVALID_DOB")
    //    LocalDate dob;
}