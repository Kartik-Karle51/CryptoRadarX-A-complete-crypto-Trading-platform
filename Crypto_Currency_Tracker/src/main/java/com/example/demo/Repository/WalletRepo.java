package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Wallet;

public interface WalletRepo extends JpaRepository<Wallet, Long>{

	Wallet findByUserId(Long userId);
	
}
