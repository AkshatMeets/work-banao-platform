package com.workbanao.workbanao_backend.repository;

import com.workbanao.workbanao_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByLocationContainingIgnoreCase(String location);
    List<Task> findByCategoryContainingIgnoreCase(String category);
    List<Task> findByCreatedBy_Id(Long userId);

}
