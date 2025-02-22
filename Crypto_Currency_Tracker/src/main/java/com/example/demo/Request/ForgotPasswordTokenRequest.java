package com.example.demo.Request;

import com.example.demo.Domain.VerificationType;

import lombok.Data;


@Data
public class ForgotPasswordTokenRequest {

	private String sendTo;
	
	private VerificationType verificationType;
}
