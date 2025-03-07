package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Domain.VerificationType;
import com.example.demo.Model.User;
import com.example.demo.Model.VerificationCode;
import com.example.demo.Repository.VerificationCodeRepo;
import com.example.demo.Utils.OtpUtils;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService{
	
	@Autowired
	private VerificationCodeRepo repo;

	@Override
	public VerificationCode sendVerificationCode(User user,VerificationType verificationType) {
		VerificationCode verificationCode1=new VerificationCode();
		verificationCode1.setOtp(OtpUtils.generateOTP());
		verificationCode1.setVerificationType(verificationType);
		verificationCode1.setUser(user);
		
		return repo.save(verificationCode1);
	}

	@Override
	public VerificationCode getVerificationCode(Long id) throws Exception {
		Optional<VerificationCode>verificationCode=repo.findById(id);
		if(verificationCode.isPresent()) {
			return verificationCode.get();
		}
	throw new Exception("Verification Code not found");
	}

	@Override
	public VerificationCode getVerificationCodeByUser(Long userId) {
		return repo.findByUserId(userId);
	}

	@Override
	public void deleteVerificationCodeById(VerificationCode verificationCode) {
		repo.delete(verificationCode);
		
	}


}
