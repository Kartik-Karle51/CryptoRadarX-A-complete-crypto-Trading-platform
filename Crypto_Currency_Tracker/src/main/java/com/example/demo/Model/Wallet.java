package com.example.demo.Model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Wallet {

	@Id
	@GeneratedValue(strategy =GenerationType.AUTO )
	private Long id;
	
	
	 @OneToOne
	    private User user;
	
	private BigDecimal balance=BigDecimal.valueOf(0);
}
