package com.example.demo.Model;

import com.example.demo.Domain.VerificationType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToken {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String id;
	
	private String otp;
	
	@OneToOne
	private User user;
	
	private VerificationType verificationType;
	
	private String sendTo;

	
	
}
