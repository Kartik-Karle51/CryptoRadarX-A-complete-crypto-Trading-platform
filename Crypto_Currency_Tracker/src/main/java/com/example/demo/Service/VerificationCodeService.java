package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.VerificationType;
import com.example.demo.Model.User;
import com.example.demo.Model.VerificationCode;


public interface VerificationCodeService {

VerificationCode sendVerificationCode(User user,VerificationType verificationType);

VerificationCode getVerificationCode(Long id) throws Exception;
	
VerificationCode getVerificationCodeByUser(Long userId);


void deleteVerificationCodeById(VerificationCode verificationCode);

}
