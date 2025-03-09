package com.example.demo.Controller;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Domain.WalletTransactionType;
import com.example.demo.Model.*;
import com.example.demo.Response.PaymentResponse;
import com.example.demo.Service.OrderService;
import com.example.demo.Service.PaymentService;
import com.example.demo.Service.TransactionService;
import com.example.demo.Service.UserService;
import com.example.demo.Service.WalletService;

@RestController

public class WalletController {

	@Autowired
	private WalletService walletService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	TransactionService walletTransactionService;
	
	@Autowired
	private PaymentService paymentService;
	
	@GetMapping("/api/wallet")
	public ResponseEntity<Wallet>getUserWallet(@RequestHeader("Authorization")String jwt) throws Exception{
		User user=userService.findUserProfileByJwt(jwt);
		
		Wallet wallet=walletService.getUserWallet(user);
		
		return new ResponseEntity<Wallet>(wallet,HttpStatus.ACCEPTED);
		
	}
	
	
	
	@PutMapping("/api/wallet/{walletId}/transfer")
	public ResponseEntity<Wallet>walletToWalletTransfer(@RequestHeader("Authorization")String jwt,@PathVariable Long walletId, @RequestBody WalletTransaction req)throws Exception{
		
		 User senderUser=userService.findUserProfileByJwt(jwt);
		 Wallet receiverWallet=walletService.findWalletById(walletId);
		 Wallet wallet=walletService.walletToWalletTransfer(senderUser, receiverWallet, req.getAmount());
		 WalletTransaction walletTransaction=walletTransactionService.createTransaction(senderUser.getWallet(),WalletTransactionType.WALLET_TRANSFER,walletId,"Transfer to another account",req.getAmount());
		return new ResponseEntity<Wallet>(wallet,HttpStatus.ACCEPTED);
	}
	
	
	
	@PutMapping("/api/wallet/deposit")
	public ResponseEntity<Wallet>addBalanceToWallet(@RequestHeader("Authorization")String jwt,@RequestParam(name="order_id")Long orderId,@RequestParam(name="payment_id")String paymentId)throws Exception{
		
		 User user=userService.findUserProfileByJwt(jwt);
		
		
		Wallet wallet=walletService.getUserWallet(user);
		
		PaymentOrder order=paymentService.getPaymentOrderById(orderId);
		
		Boolean status=paymentService.proceedPaymentOrder(order, paymentId);
		if(wallet.getBalance()==null) {
			wallet.setBalance(BigDecimal.valueOf(0));
		}
		if(status) {
			wallet =walletService.addBalance(wallet, order.getAmount());
		}
		 
		return new ResponseEntity<Wallet>(wallet,HttpStatus.ACCEPTED);
	}
}
