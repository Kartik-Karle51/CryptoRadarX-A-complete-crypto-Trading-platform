package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.PaymentDetails;

public interface PaymentDetailsRepo extends JpaRepository<PaymentDetails, Long>{

	
	PaymentDetails findByUserId(Long userId);
}
