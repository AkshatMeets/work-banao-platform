package com.workbanao.workbanao_backend.service.impl;

import com.workbanao.workbanao_backend.entity.Bid;
import com.workbanao.workbanao_backend.entity.Task;
import com.workbanao.workbanao_backend.entity.User;
import com.workbanao.workbanao_backend.entity.enums.BidStatus;
import com.workbanao.workbanao_backend.repository.BidRepository;
import com.workbanao.workbanao_backend.repository.TaskRepository;
import com.workbanao.workbanao_backend.repository.UserRepository;
import com.workbanao.workbanao_backend.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BidServiceImpl implements BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Bid placeBid(Long taskId, Long workerId, Bid bid) {
        Task task = taskRepository.findById(taskId).orElseThrow(()->new RuntimeException("Task not found"));
        User worker = userRepository.findById(workerId).orElseThrow(()->new RuntimeException("Worker not found"));

        bid.setTask(task);
        bid.setWorker(worker);
        bid.setBidTime(LocalDateTime.now());
        bid.setStatus(BidStatus.PENDING);

        return bidRepository.save(bid);
    }

    @Override
    public List<Bid> getBidsForTask(Long taskId) {
        return bidRepository.findByTaskId(taskId);
    }

    @Override
    public List<Bid> getBidsByWorker(Long workerId) {
        return bidRepository.findByWorkerId(workerId);
    }
}
