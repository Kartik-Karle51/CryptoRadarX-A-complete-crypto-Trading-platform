package com.example.demo.Service;

import com.example.demo.Domain.PaymentMethod;
import com.example.demo.Model.PaymentOrder;
import com.example.demo.Model.User;
import com.example.demo.Response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {
 PaymentOrder createOrder(User user,Long amount,PaymentMethod paymentMethod);
 
 PaymentOrder getPaymentOrderById(Long id) throws Exception;
 
 Boolean proceedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException;
 
 PaymentResponse createRazorpayPaymentLink(User user,Long Amount,Long orderId) throws RazorpayException;
 
 PaymentResponse createStripePaymentLink(User user,Long amount,Long orderId) throws StripeException;
}
