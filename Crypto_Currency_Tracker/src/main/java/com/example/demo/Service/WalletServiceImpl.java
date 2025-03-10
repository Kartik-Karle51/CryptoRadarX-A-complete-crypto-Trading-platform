package com.example.demo.Service;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.OrderType;
import com.example.demo.Model.Order;
import com.example.demo.Model.User;
import com.example.demo.Model.Wallet;
import com.example.demo.Repository.WalletRepo;


@Service
public class WalletServiceImpl implements WalletService{

	@Autowired
	WalletRepo repo;
	
	
	@Override
	public Wallet getUserWallet(User user) {
		
		Wallet wallet=repo.findByUserId(user.getId());
		if(wallet ==null) {
			wallet=new Wallet();
			wallet.setUser(user);
			repo.save(wallet);
		}
		return wallet;
	}

	
	@Override
	public Wallet addBalance(Wallet wallet, Long amount) {
	BigDecimal balance=wallet.getBalance();
	BigDecimal newBalance=balance.add(BigDecimal.valueOf(amount));
	
	wallet.setBalance(newBalance);
		return repo.save(wallet);
	}

	
	@Override
	public Wallet findWalletById(Long id) throws Exception {
		Optional<Wallet> wallet=repo.findById(id);
		if(wallet.isPresent()) {
			return wallet.get();
		}
		throw new Exception("Wallet Not Found");
	}

	
	@Override
	public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception {
		
		Wallet senderWallet=getUserWallet(sender);
		if(senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
			throw new Exception("Insufficient Balance");
		}
		
		BigDecimal senderBalance=senderWallet
				.getBalance()
				.subtract(BigDecimal.valueOf(amount));
		
		senderWallet.setBalance(senderBalance);
		repo.save(senderWallet);
		
		BigDecimal receiverBalance=receiverWallet.getBalance().add(BigDecimal.valueOf(amount));
		receiverWallet.setBalance(receiverBalance);
		 repo.save(receiverWallet);
	
		 return senderWallet;
	}
	
	
	@Override
	public Wallet payOrderPayment(Order order, User user) throws Exception {
	    if (order == null || user == null) {
	        throw new Exception("Order or User cannot be null");
	    }

	    Wallet wallet = getUserWallet(user);
	    if (wallet == null) {
	        throw new Exception("Wallet not found for user: " + user.getId());
	    }

	    BigDecimal newBalance;
	    
	    if (order.getOrderType().equals(OrderType.BUY)) {
	        newBalance = wallet.getBalance().subtract(order.getPrice());
	        
	        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
	            throw new Exception("Insufficient funds for this transaction. Available balance: " 
	                + wallet.getBalance() + ", Required: " + order.getPrice());
	        }
	    } else {
	        newBalance = wallet.getBalance().add(order.getPrice());
	    }

	    wallet.setBalance(newBalance);
	    repo.save(wallet);

	    return wallet;
	}


}
