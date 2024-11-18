package CNPM.G14.ems.repository;

import CNPM.G14.ems.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    List<Project> findByDepartmentId(int departmentId);
    Optional<Project> findById(int id);
}
