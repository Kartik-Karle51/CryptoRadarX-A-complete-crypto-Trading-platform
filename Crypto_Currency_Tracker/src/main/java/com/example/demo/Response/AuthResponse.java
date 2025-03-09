package com.example.demo.Response;

import lombok.Data;

@Data
public class AuthResponse {

	
	private String jwt;
	private boolean status;
	private String message;
	private String fullName;
	private String session;
	
}
