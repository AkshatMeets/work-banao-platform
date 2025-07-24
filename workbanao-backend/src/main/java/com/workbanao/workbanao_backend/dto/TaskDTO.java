package com.workbanao.workbanao_backend.dto;

import com.workbanao.workbanao_backend.entity.enums.TaskStatus;

import java.time.LocalDateTime;

public class TaskDTO {
    public Long id;
    public String title;
    public String description;
    public String category;
    public String location;
    public TaskStatus status;
    public String postedBy;
    public LocalDateTime createdAt;
}
