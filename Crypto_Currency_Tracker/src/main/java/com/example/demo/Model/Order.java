package com.example.demo.Model;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.demo.Domain.OrderStatus;
import com.example.demo.Domain.OrderType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	private User user;
	
	@Column(nullable = false)
	private OrderType orderType;
	
	
	@Column(nullable = false)
	private BigDecimal price; 
	
	private LocalDateTime timeStamp=LocalDateTime.now();
	
	@Column(nullable = false)
	private OrderStatus status;
	
	@OneToOne(mappedBy = "order",cascade = CascadeType.ALL)
	private OrderItem orderItem;
}
