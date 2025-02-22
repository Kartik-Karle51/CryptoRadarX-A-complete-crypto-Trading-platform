package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Order;

public interface OrderRepo extends JpaRepository<Order, Long>{

	List<Order> findByUserId(Long userId);
}
