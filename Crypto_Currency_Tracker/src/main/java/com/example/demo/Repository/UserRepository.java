package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.Model.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmail(String email);
}
