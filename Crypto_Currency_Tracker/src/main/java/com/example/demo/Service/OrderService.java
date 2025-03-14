package com.example.demo.Service;

import java.util.List;

import com.example.demo.Domain.OrderType;
import com.example.demo.Model.*;

public interface OrderService {

	Order createOrder(User user,OrderItem orderItem,OrderType orderType);
	
	List<Order>getAllOrdersOfUser(Long userId,OrderType orderType,String assetSymbol);
	
	Order processOrder(Coin coin, double quantity,OrderType orderType,User user) throws Exception;
	
	
	
}
