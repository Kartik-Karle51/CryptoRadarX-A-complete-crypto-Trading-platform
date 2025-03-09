package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Domain.OrderType;
import com.example.demo.Model.*;
import com.example.demo.Request.CreateOrderRequest;
import com.example.demo.Service.CoinService;
import com.example.demo.Service.OrderService;
import com.example.demo.Service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CoinService coinService;
	
	@PostMapping("/pay")
	public ResponseEntity<Order>payOrderPayment(@RequestHeader("Authorization")String jwt, @RequestBody CreateOrderRequest req)throws Exception{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		Coin coin=coinService.findById(req.getCoinId());
		
		Order order=orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);
		
		return ResponseEntity.ok(order);
		
	}
	
	
	
	@GetMapping()
	public ResponseEntity<List<Order>> getAllOrdersForUser(@RequestHeader("Authorization")String jwtToken,@RequestParam(required = false) OrderType order_type,@RequestParam(required = false)String asset_symbol)throws Exception{
	
		Long userId=userService.findUserProfileByJwt(jwtToken).getId();
		
		List<Order>userOrders=orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);
		
		return ResponseEntity.ok(userOrders);
	}
	
}
