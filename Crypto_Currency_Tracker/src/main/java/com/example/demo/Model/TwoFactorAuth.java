package com.example.demo.Model;

import com.example.demo.Domain.VerificationType;

import lombok.Data;

@Data
public class TwoFactorAuth {

	private boolean isEnabled=false;
	private VerificationType sendTo;
	
	
	
}
