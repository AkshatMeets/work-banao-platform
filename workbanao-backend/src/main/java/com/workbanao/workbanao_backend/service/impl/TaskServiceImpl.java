package com.workbanao.workbanao_backend.service.impl;

import com.workbanao.workbanao_backend.entity.Task;
import com.workbanao.workbanao_backend.entity.User;
import com.workbanao.workbanao_backend.entity.enums.TaskStatus;
import com.workbanao.workbanao_backend.repository.TaskRepository;
import com.workbanao.workbanao_backend.repository.UserRepository;
import com.workbanao.workbanao_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Task createTask(Task task, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User not found!"));
        task.setCreatedBy(user);
        task.setStatus(TaskStatus.OPEN);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> getTasksByLocation(String location) {
        return taskRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Task> getTaskByCategory(String category) {
        return taskRepository.findByCategoryContainingIgnoreCase(category);
    }
}
