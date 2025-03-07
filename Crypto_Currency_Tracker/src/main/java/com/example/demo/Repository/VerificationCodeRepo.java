package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.VerificationCode;

public interface VerificationCodeRepo extends JpaRepository<VerificationCode, Long>{

	public VerificationCode findByUserId(Long userId);
}
