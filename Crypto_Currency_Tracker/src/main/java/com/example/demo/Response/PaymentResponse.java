
package com.example.demo.Response;

import lombok.Data;

@Data
public class PaymentResponse {

	public PaymentResponse(String string) {
	}

	public PaymentResponse() {
		super();
		
	}

	private String payment_url;
	
}
