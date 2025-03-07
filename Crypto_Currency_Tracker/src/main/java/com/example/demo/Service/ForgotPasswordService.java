package com.example.demo.Service;

import com.example.demo.Domain.VerificationType;
import com.example.demo.Model.ForgotPasswordToken;
import com.example.demo.Model.User;

public interface ForgotPasswordService {

	ForgotPasswordToken createToken(User user,String id,String otp,VerificationType verificationType,String sendTo);
	
	ForgotPasswordToken findById(String id);
	
	ForgotPasswordToken findByUser(Long id);
	
	void deleteToken(ForgotPasswordToken token);
	
}
