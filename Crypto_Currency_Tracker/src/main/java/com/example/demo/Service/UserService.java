package com.example.demo.Service;


import com.example.demo.Model.User;

public interface UserService {

	public User findUserProfileByJwt(String jwt) throws Exception;
}
