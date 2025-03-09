package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;



import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.config.JwtProvider;

@RestController
public class UserServiceImpl implements UserService {

	
	@Autowired
	UserRepository userRepo;
	
	
	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
String email=JwtProvider.getEmailFromToken(jwt);
User user=userRepo.findByEmail(email);
if(user == null) {
	throw new Exception("User Not Found");
}
		return user;
	}
}
