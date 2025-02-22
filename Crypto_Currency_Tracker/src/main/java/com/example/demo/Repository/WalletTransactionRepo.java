package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Wallet;
import com.example.demo.Model.WalletTransaction;

public interface WalletTransactionRepo extends JpaRepository<WalletTransaction, Long>{

	List<WalletTransaction> findByWallet(Wallet wallet);

}
