package com.example.demo.Service;

import com.example.demo.Model.PaymentDetails;
import com.example.demo.Model.User;

public interface PaymentDetailsService {
public PaymentDetails addPaymentDetails(String accountNumber,String accountHolderName,String ifsc,String bankName,User user);

public PaymentDetails getUSerPaymentDetails(User userId);
}
