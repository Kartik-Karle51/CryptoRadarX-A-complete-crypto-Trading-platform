package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.PaymentDetails;
import com.example.demo.Model.User;
import com.example.demo.Repository.PaymentDetailsRepo;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService{

	@Autowired
	PaymentDetailsRepo repo;
	
	@Override
	public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc,
			String bankName, User user) {
		PaymentDetails paymentDetails=new PaymentDetails();
		paymentDetails.setAccountHolderName(accountHolderName);
		paymentDetails.setAccountNumber(accountNumber);
		paymentDetails.setBankName(bankName);
		paymentDetails.setIfsc(ifsc);
		paymentDetails.setUser(user);
		return repo.save(paymentDetails);
	}

	@Override
	public PaymentDetails getUSerPaymentDetails(User user) {
		
		return repo.findByUserId(user.getId());
	}

}
