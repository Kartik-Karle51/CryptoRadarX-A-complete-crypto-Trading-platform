package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long>{

}
