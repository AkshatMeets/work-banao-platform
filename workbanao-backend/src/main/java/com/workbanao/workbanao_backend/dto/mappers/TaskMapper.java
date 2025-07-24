package com.workbanao.workbanao_backend.dto.mappers;

import com.workbanao.workbanao_backend.dto.TaskDTO;
import com.workbanao.workbanao_backend.dto.TaskRequest;
import com.workbanao.workbanao_backend.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.id = task.getId();
        dto.title = task.getTitle();
        dto.description = task.getDescription();
        dto.category = task.getCategory();
        dto.location = task.getLocation();
        dto.status = task.getStatus();
        dto.createdAt = task.getCreatedAt();
        dto.postedBy = task.getCreatedBy().getName();
        return dto;
    }

    public Task toEntity(TaskRequest req) {
        Task task = new Task();
        task.setTitle(req.title);
        task.setDescription(req.description);
        task.setCategory(req.category);
        task.setLocation(req.location);
        return task;
    }
}



