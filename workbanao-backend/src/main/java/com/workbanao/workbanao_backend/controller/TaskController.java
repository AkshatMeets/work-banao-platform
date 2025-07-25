package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.dto.TaskDTO;
import com.workbanao.workbanao_backend.dto.TaskRequest;
import com.workbanao.workbanao_backend.dto.mappers.TaskMapper;
import com.workbanao.workbanao_backend.entity.Task;
import com.workbanao.workbanao_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    private final TaskMapper taskMapper;

    public TaskController(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<TaskDTO> createTask(@PathVariable Long userId, @RequestBody TaskRequest taskReq) {
        Task task = taskMapper.toEntity(taskReq);
        Task saved = taskService.createTask(task, userId);
        return new ResponseEntity<>(taskMapper.toDTO(saved), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        List<TaskDTO> dtos = taskService.getAllTasks().stream()
                .map(taskMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Task>> getByLocation(@PathVariable String location){
        return new ResponseEntity<>(taskService.getTasksByLocation(location),HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Task>> getByCategory(@PathVariable String category){
        return new ResponseEntity<>(taskService.getTaskByCategory(category),HttpStatus.OK);
    }
}


