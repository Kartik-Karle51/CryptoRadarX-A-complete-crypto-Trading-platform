package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.WithdrawalStatus;
import com.example.demo.Model.User;
import com.example.demo.Model.Withdrawal;
import com.example.demo.Repository.WithdrawalRepo;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

	@Autowired
	private WithdrawalRepo repo;
	
	@Override
	public Withdrawal requestWithdrawal(Long amount, User user) {
		
		Withdrawal withdrawal=new Withdrawal();
		withdrawal.setAmount(amount);
		withdrawal.setUser(user);
		withdrawal.setStatus(WithdrawalStatus.PENDING);
		return repo.save(withdrawal);
	}
	
	

	@Override
	public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception {
		Optional<Withdrawal> withdrawal=repo.findById(withdrawalId);
		if(withdrawal.isEmpty()) {
			throw new Exception("Withdrawal Not Found");
		}
		
		Withdrawal withdrawal1=withdrawal.get();
		
		withdrawal1.setDate(LocalDateTime.now());
		
		if(accept) {
			withdrawal1.setStatus(WithdrawalStatus.SUCCESS);
		}
		else {
			withdrawal1.setStatus(WithdrawalStatus.PENDING);
		}
		
		return repo.save(withdrawal1);
	}

	
	
	@Override
	public List<Withdrawal> getUsersWithdrawalHistory(User user) {
		
		return repo.findByUserId(user.getId());
	}

	
	
	@Override
	public List<Withdrawal> getAllWithdrawalRequest() {
		
		return repo.findAll();
	}

}
