package com.example.demo.Controller;



import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.webauthn.api.AuthenticatorResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Response.AuthResponse;
import com.example.demo.Service.CustomUserDetailsService;
import com.example.demo.Service.WatchListService;
import com.example.demo.config.JwtProvider;


@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	CustomUserDetailsService service;
	
	
	@Autowired
	private WatchListService watchListService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	

	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {

	    User isEmailExists = userRepo.findByEmail(user.getEmail());
	    if (isEmailExists != null) {
	        throw new Exception("Email is already used with another account");
	    }



	    // Create new user
	    User newUser = new User();
	    newUser.setEmail(user.getEmail());
	    newUser.setPassword(passwordEncoder.encode(user.getPassword()));
	    newUser.setFullName(user.getFullName());
	    newUser.setNationality(user.getNationality());
	    newUser.setMobileNo(user.getMobileNo());

	    User savedUser = userRepo.save(newUser);

	    watchListService.createWatchList(savedUser);

	    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
	        user.getEmail(),
	        user.getPassword()
	    );

	    SecurityContextHolder.getContext().setAuthentication(auth);

	    String jwt = JwtProvider.generateToken(auth);
	    

	    AuthResponse authResponse = new AuthResponse();
	    authResponse.setJwt(jwt);
	    authResponse.setStatus(true);
	    authResponse.setFullName(user.getFullName());
	    authResponse.setMessage("Register Success");

	    return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
	}
	
	
	
	
	
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse>login(@RequestBody User user) throws Exception{
	
		String username=user.getEmail();
		String password=user.getPassword();
		
		Authentication auth=authenticate(username,password);
		
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		
		String jwt=JwtProvider.generateToken(auth);
		
		User user1=userRepo.findByEmail(username);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setJwt(jwt);
		authResponse.setFullName(user1.getFullName());
		authResponse.setStatus(true);
		authResponse.setMessage("Login Success");
		return new ResponseEntity<>(authResponse,HttpStatus.CREATED);
	}

	
	private Authentication authenticate(String username, String password) {
	    UserDetails userDetails = service.loadUserByUsername(username);
	    if (userDetails == null) {
	        throw new BadCredentialsException("Invalid Username");
	    }

	
	    if (!passwordEncoder.matches(password, userDetails.getPassword())) {
	        throw new BadCredentialsException("Invalid Password");
	    }

	    return new UsernamePasswordAuthenticationToken(
	        userDetails, password, userDetails.getAuthorities()
	    );
	}


	
}
