package com.workbanao.workbanao_backend.service;

import com.workbanao.workbanao_backend.entity.Task;

import java.util.List;

public interface TaskService {
    Task createTask(Task task, Long userId);
    List<Task> getAllTasks();
    List<Task> getTasksByLocation(String location);
    List<Task> getTaskByCategory(String category);
}
