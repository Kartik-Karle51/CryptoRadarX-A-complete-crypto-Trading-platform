package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
		return repo.save(withdrawal);
	}
	
	

	
	
	@Override
	public List<Withdrawal> getUsersWithdrawalHistory(User user) {
		
		return repo.findByUserId(user.getId());
	}

	
	


}
