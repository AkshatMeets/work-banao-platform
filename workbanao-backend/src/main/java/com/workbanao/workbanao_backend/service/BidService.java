package com.workbanao.workbanao_backend.service;
import java.util.List;
import com.workbanao.workbanao_backend.entity.Bid;

public interface BidService {
    Bid placeBid(Long taskId, Long workerId, Bid bid);
    List<Bid> getBidsForTask(Long taskId);
    List<Bid> getBidsByWorker(Long workerId);
}
