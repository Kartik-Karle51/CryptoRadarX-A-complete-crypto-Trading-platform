package com.example.demo.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleException(Exception ex) {
	    return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(HttpClientErrorException.TooManyRequests.class)
    public ResponseEntity<String> handleTooManyRequests(HttpClientErrorException ex) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                             .body("Too many requests, please try again later.");
    }

}
