package com.example.demo.Model;

import java.time.LocalDateTime;

import com.example.demo.Domain.WithdrawalStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Withdrawal {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private WithdrawalStatus status;
	
	private Long amount;
	
	@ManyToOne
//    @JsonIgnore  // Ignore user to prevent circular reference when serializing Withdrawal
    private User user;
	
	private LocalDateTime date=LocalDateTime.now();
}
