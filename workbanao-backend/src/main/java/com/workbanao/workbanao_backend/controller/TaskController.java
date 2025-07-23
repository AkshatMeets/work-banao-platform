package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.entity.Task;
import com.workbanao.workbanao_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<Task> createTask(@PathVariable Long userId, @RequestBody Task task) {
        Task created = taskService.createTask(task, userId);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(taskService.getAllTasks(),HttpStatus.OK);
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


