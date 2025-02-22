package com.example.demo.Model;

import com.example.demo.Domain.USER_ROLE;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
public class User {



	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "fullName")
	private String fullName;
	private String email;
	
	@JsonProperty(access = Access.WRITE_ONLY)	//We can just write or enter password but we can't see it
	private String password;
	
	
	@OneToOne(mappedBy = "user")
    @JsonIgnore  // Ignore wallet to prevent circular reference when serializing User
    private Wallet wallet;
	
	@Embedded
	private TwoFactorAuth twoFactorAuth=new TwoFactorAuth();
	
	private USER_ROLE role=USER_ROLE.ROLE_CUSTOMER;		//This is the default role
	
	
}
