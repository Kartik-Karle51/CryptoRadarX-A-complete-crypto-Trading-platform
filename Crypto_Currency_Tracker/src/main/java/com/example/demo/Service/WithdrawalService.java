package com.example.demo.Service;

import java.util.List;

import com.example.demo.Model.User;
import com.example.demo.Model.Withdrawal;

public interface WithdrawalService {

	Withdrawal requestWithdrawal(Long amount ,User user);
	
	List<Withdrawal> getUsersWithdrawalHistory(User user);
	
}
