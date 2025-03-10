package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Domain.WalletTransactionType;
import com.example.demo.Model.User;
import com.example.demo.Model.Wallet;
import com.example.demo.Model.WalletTransaction;
import com.example.demo.Model.Withdrawal;
import com.example.demo.Service.TransactionService;
import com.example.demo.Service.UserService;
import com.example.demo.Service.WalletService;
import com.example.demo.Service.WithdrawalService;

@RestController
public class WithdrawalController {

	@Autowired
	private WithdrawalService withdrawalService;
	
	@Autowired
	private WalletService walletService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TransactionService walletTransactionService;
	
	
	@PostMapping("/api/withdrawal/{amount}")
	public ResponseEntity<?>withdrawalRequest(@PathVariable Long amount ,
			@RequestHeader("Authorization")String jwt)throws Exception{
		
		User user=userService.findUserProfileByJwt(jwt);
		
		Wallet userWallet=walletService.getUserWallet(user);
		
		Withdrawal withdrawal=withdrawalService.requestWithdrawal(amount, user);
		
		walletService.addBalance(userWallet, -withdrawal.getAmount());
		
		WalletTransaction walletTransaction=walletTransactionService.createTransaction(userWallet,WalletTransactionType.WITHDRAWAL,null,"bank Account withdrawal",withdrawal.getAmount());
		
		return new ResponseEntity<>(withdrawal,HttpStatus.OK);
	}

	
	
	@GetMapping("/api/withdrawal")
	public ResponseEntity<List<Withdrawal>> getWithdrawalHistory(@RequestHeader("Authorization")String jwt)throws Exception{
		User user=userService.findUserProfileByJwt(jwt);
		
		List<Withdrawal>withdrawal=withdrawalService.getUsersWithdrawalHistory(user);
		return new ResponseEntity<>(withdrawal,HttpStatus.OK);
	}
	
}
