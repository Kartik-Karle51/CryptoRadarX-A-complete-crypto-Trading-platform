package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Coin;

public interface CoinRepository extends JpaRepository<Coin, String>{

}
