package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Withdrawal;

public interface WithdrawalRepo extends JpaRepository<Withdrawal, Long>{

	List<Withdrawal> findByUserId(Long userId);
}
