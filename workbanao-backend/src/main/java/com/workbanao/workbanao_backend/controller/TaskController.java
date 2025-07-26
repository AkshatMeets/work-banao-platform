package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.dto.TaskDTO;
import com.workbanao.workbanao_backend.dto.TaskRequest;
import com.workbanao.workbanao_backend.dto.mappers.TaskMapper;
import com.workbanao.workbanao_backend.entity.Task;
import com.workbanao.workbanao_backend.repository.TaskRepository;
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

    @Autowired
    private TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    public TaskController(TaskMapper taskMapper) {
        this.taskMapper = taskMapper;
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<TaskDTO> createTask(@PathVariable Long userId, @RequestBody TaskRequest taskReq) {
        try {
            System.out.println("Creating task for user ID: " + userId);
            System.out.println("Task request: " + taskReq.toString());

            Task task = taskMapper.toEntity(taskReq);
            System.out.println("Mapped task entity: " + task.toString());

            Task saved = taskService.createTask(task, userId);
            System.out.println("Task saved successfully with ID: " + saved.getId());

            TaskDTO dto = taskMapper.toDTO(saved);
            return new ResponseEntity<>(dto, HttpStatus.CREATED);

        } catch (Exception e) {
            System.err.println("Error creating task: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        try {
            List<TaskDTO> dtos = taskService.getAllTasks().stream()
                    .map(taskMapper::toDTO).toList();
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            System.err.println("Error getting all tasks: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<Task>> getByLocation(@PathVariable String location){
        try {
            return new ResponseEntity<>(taskService.getTasksByLocation(location), HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error getting tasks by location: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Task>> getByCategory(@PathVariable String category){
        try {
            return new ResponseEntity<>(taskService.getTaskByCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error getting tasks by category: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<Task>> getTasksByUser(@PathVariable Long userId) {
        List<Task> tasks = taskRepository.findByCreatedBy_Id(userId);
        return ResponseEntity.ok(tasks);
    }
}