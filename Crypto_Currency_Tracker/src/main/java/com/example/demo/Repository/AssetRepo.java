package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Asset;

public interface AssetRepo extends JpaRepository<Asset, Long>{

	List<Asset> findByUserId(Long userId);
	
	Asset findByUserIdAndCoinId(Long userId,String coinId);
	
	
	
}
