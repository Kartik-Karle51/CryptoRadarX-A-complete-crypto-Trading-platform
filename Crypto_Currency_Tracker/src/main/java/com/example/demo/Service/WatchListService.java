package com.example.demo.Service;

import com.example.demo.Model.*;

public interface WatchListService {

	
	Watchlist findUserWatchList(Long userId) throws Exception;
	
	Watchlist createWatchList(User user);
	
	Coin addItemToWatchlist(Coin coin,User user) throws Exception;
	
	
}
