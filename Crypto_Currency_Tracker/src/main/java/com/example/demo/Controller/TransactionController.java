package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.User;
import com.example.demo.Model.Wallet;
import com.example.demo.Model.WalletTransaction;
import com.example.demo.Service.TransactionService;
import com.example.demo.Service.UserService;
import com.example.demo.Service.WalletService;

@RestController
public class TransactionController {

	@Autowired
	private WalletService walletService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	TransactionService transactionService;
	
	@GetMapping("/api/transactions")
	public ResponseEntity<List<WalletTransaction>>getUserWallet(@RequestHeader("Authorization")String jwt)throws Exception{
		User user=userService.findUserProfileByJwt(jwt);
		
		Wallet wallet=walletService.getUserWallet(user);
		
		List<WalletTransaction>transactionList=transactionService.getTransactionByWallet(wallet);
		
		return new ResponseEntity<>(transactionList,HttpStatus.ACCEPTED);
	}
	
	
}
