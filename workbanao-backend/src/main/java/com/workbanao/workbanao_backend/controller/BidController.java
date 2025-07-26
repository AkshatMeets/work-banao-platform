package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.entity.Bid;
import com.workbanao.workbanao_backend.entity.Task;
import com.workbanao.workbanao_backend.entity.enums.BidStatus;
import com.workbanao.workbanao_backend.entity.enums.TaskStatus;
import com.workbanao.workbanao_backend.repository.BidRepository;
import com.workbanao.workbanao_backend.repository.TaskRepository;
import com.workbanao.workbanao_backend.service.BidService;
import org.hibernate.dialect.unique.CreateTableUniqueDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bids")
public class BidController {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private BidService bidService;

    @PostMapping("/place/{taskId}/{workerId}")
    public ResponseEntity<Bid> placeBid(
            @PathVariable Long taskId,
            @PathVariable Long workerId,
            @RequestBody Bid bid){
    Bid savedBid = bidService.placeBid(taskId,workerId,bid);
    return new ResponseEntity<>(savedBid, HttpStatus.CREATED);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Bid>> getBidsForTask(@PathVariable Long taskId){
        return new ResponseEntity<>(bidService.getBidsForTask(taskId),HttpStatus.OK);
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<Bid>> getBidsByWorker(@PathVariable Long workerId){
        return new ResponseEntity<>(bidService.getBidsByWorker(workerId),HttpStatus.OK);
    }
    @PostMapping("/accept/{bidId}")
    public ResponseEntity<String> acceptBid(@PathVariable Long bidId) {
        Optional<Bid> optionalBid = bidRepository.findById(bidId);
        if (optionalBid.isEmpty()) return ResponseEntity.notFound().build();

        Bid selectedBid = optionalBid.get();
        Task task = selectedBid.getTask();

        // Mark all other bids as REJECTED
        List<Bid> allBids = bidRepository.findByTaskId(task.getId());
        for (Bid bid : allBids) {
            if (!bid.getId().equals(bidId)) {
                bid.setStatus(BidStatus.REJECTED);
            }
        }

        // Accept the selected bid
        selectedBid.setStatus(BidStatus.ACCEPTED);
        task.setStatus(TaskStatus.ASSIGNED);

        bidRepository.saveAll(allBids);
        bidRepository.save(selectedBid);
        taskRepository.save(task);

        return ResponseEntity.ok("Bid accepted successfully.");
    }
}
