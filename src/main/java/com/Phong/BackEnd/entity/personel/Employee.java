package com.Phong.BackEnd.entity.personel;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.Phong.BackEnd.entity.tasks.Tasks;
import jakarta.persistence.*;

import com.Phong.BackEnd.entity.departments.Department;
import com.Phong.BackEnd.entity.projects.Projects;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.springframework.scheduling.config.Task;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@SuperBuilder
@Table(name = "employee")
public class Employee extends Personel {

    @Builder.Default
    int tasksCompleteNumber = 0;

    @Builder.Default
    int project_involved = 0;


    @Builder.Default
    @ManyToMany
    @JoinTable(
            name = "emp_proj",
            joinColumns = @JoinColumn(name = "EmployeeCode"),
            inverseJoinColumns = @JoinColumn(name = "ProjectId"))
    Set<Projects> projectList = new HashSet<>();

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Tasks> taskList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "departmentID")
    Department department;
}
