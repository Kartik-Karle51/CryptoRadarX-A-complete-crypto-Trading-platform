package com.example.demo.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.OrderStatus;
import com.example.demo.Domain.OrderType;
import com.example.demo.Model.Asset;
import com.example.demo.Model.Coin;
import com.example.demo.Model.Order;
import com.example.demo.Model.OrderItem;
import com.example.demo.Model.User;
import com.example.demo.Repository.OrderItemRepo;
import com.example.demo.Repository.OrderRepo;
import org.springframework.transaction.annotation.*;


@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepo orderRepo;
	
	@Autowired
	private OrderItemRepo orderItemRepo;
	
	@Autowired
	private WalletService walletService;
	
	@Autowired
	private AssetService assetService;
	
	@Override
	public Order createOrder(User user, OrderItem orderItem, OrderType orderType) {
		double price=orderItem.getCoin().getCurrentPrice()*orderItem.getQuantity();
		
		Order order=new Order();
		order.setUser(user);
		order.setOrderItem(orderItem);
		order.setOrderType(orderType);
		order.setPrice(BigDecimal.valueOf(price));
		order.setTimeStamp(LocalDateTime.now());
		order.setStatus(OrderStatus.PENDING);	
		
		return orderRepo.save(order);
	}
	

	@Override
	public List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol) {
		
		return orderRepo.findByUserId(userId);
	}

	
	private OrderItem createOrderItem(Coin coin,double quantity,double buyPrice,double sellPrice) {
		
		OrderItem orderItem=new OrderItem();
		orderItem.setBuyPrice(buyPrice);
		orderItem.setCoin(coin);
		orderItem.setQuantity(quantity);
		orderItem.setSellPrice(sellPrice);
		
		return orderItemRepo.save(orderItem);
	}
	
	
	@Transactional
	public Order buyAsset(Coin coin,double quantity,User user) throws Exception {

		double buyPrice=coin.getCurrentPrice();
		OrderItem orderItem=createOrderItem(coin, quantity, buyPrice, 0);
		
		Order order=createOrder(user, orderItem, OrderType.BUY);
		
		orderItem.setOrder(order);
		
		walletService.payOrderPayment(order, user);
		
		order.setStatus(OrderStatus.SUCCESS);
		
		order.setOrderType(OrderType.BUY);
		
		Order savedOrder=orderRepo.save(order);
		Asset oldAsset=assetService.findAssetByUserIdAndCoinId(order.getUser().getId(),order.getOrderItem().getCoin().getId());
		
		if(oldAsset==null) {
			assetService.createAsset(user, orderItem.getCoin(), order.getOrderItem().getQuantity());
		}
		else {
			assetService.updateAsset(oldAsset.getId(), quantity);
		}
		return savedOrder;
	}
	
	
	
	@Transactional
	public Order sellAsset(Coin coin,double quantity,User user) throws Exception {
		if(quantity<=0) {
			throw new Exception("Quantity should be greater than 0");
			
		}
		
		double sellPrice=coin.getCurrentPrice();
	
		Asset assetToSell=assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId());
		double buyPrice=assetToSell.getBuyPrice();
		if(assetToSell!=null) {
			
		OrderItem orderItem=createOrderItem(coin, quantity,buyPrice, sellPrice);
		
		Order order=createOrder(user, orderItem, OrderType.SELL);
		
		orderItem.setOrder(order);
		
		
		if(assetToSell.getQuantity()>=quantity) {
			
			order.setStatus(OrderStatus.SUCCESS);
			
			order.setOrderType(OrderType.SELL);
			
			Order savedOrder=orderRepo.save(order);
			
		walletService.payOrderPayment(order, user);
		
		Asset updatedAsset=assetService.updateAsset(assetToSell.getId(),-quantity);
		if(updatedAsset.getQuantity()*coin.getCurrentPrice()<=1) {
			assetService.deleteAsset(updatedAsset.getId());
		}
		return savedOrder;
		}
		throw new Exception("Insufficient Quantity to sell");
		}
		throw new Exception("Asset Not Found");

	}
	
	
	@Override
	@Transactional
	public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
		
		if(orderType.equals(OrderType.BUY)) {
			return buyAsset(coin, quantity, user);
		}
		else if(orderType.equals(OrderType.SELL)) {
			return sellAsset(coin, quantity, user);
		}
		
		throw new Exception("Invalid Order Type");
	}

}
