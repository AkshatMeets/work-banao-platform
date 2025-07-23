package com.workbanao.workbanao_backend.repository;

import com.workbanao.workbanao_backend.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid,Long> {
    List<Bid> findByTaskId(Long taskId);
    List<Bid> findByWorkerId(Long workerId);
}
