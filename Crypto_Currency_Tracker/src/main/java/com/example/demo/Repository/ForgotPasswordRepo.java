package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.ForgotPasswordToken;

public interface ForgotPasswordRepo extends JpaRepository<ForgotPasswordToken, String> {
	
ForgotPasswordToken findByUserId(Long userId);
}
