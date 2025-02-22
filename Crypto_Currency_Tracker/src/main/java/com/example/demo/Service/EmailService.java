package com.example.demo.Service;

import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService {

	private JavaMailSender mailSender;
	
	public void sendVerificationOTPEmail(String email,String otp) throws MessagingException {
		MimeMessage mimeMessage=mailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,"utf-8");
		
		String subject="Verification OTP";
		String text="Your verification Code is "+otp;
		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(text);
		mimeMessageHelper.setTo(email);
		
		try {
//			mailSender.send(mimeMessage);
		}
		catch(MailException e) {
			throw new MailSendException(e.getMessage());
		}
		
	}
	
}
