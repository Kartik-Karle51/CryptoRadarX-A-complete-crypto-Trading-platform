package com.example.demo.Request;

import com.example.demo.Domain.OrderType;

import lombok.Data;

@Data
public class CreateOrderRequest {

	private String coinId;
	private double quantity;
	private OrderType orderType;
	
}
