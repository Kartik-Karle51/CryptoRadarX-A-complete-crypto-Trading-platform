package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Watchlist;

public interface WatchListRepo extends JpaRepository<Watchlist, Long>{

	Watchlist findByUserId(Long userId);
}
