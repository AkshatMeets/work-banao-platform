package com.workbanao.workbanao_backend.controller;

import com.workbanao.workbanao_backend.entity.Bid;
import com.workbanao.workbanao_backend.service.BidService;
import org.hibernate.dialect.unique.CreateTableUniqueDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bids")
public class BidController {

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
}
