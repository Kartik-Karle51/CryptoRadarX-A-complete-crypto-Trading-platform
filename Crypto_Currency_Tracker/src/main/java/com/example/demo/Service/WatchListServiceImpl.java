package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Coin;
import com.example.demo.Model.User;
import com.example.demo.Model.Watchlist;
import com.example.demo.Repository.WatchListRepo;

@Service
public class WatchListServiceImpl implements WatchListService{

	@Autowired
	WatchListRepo repo;
	
	@Override
	public Watchlist findUserWatchList(Long userId) throws Exception {
		
		Watchlist watchlist=repo.findByUserId(userId);
		
		if(watchlist == null)
		{		
		throw new Exception("Watchlist not found");
		}
		
		return watchlist;
	}

	
	@Override
	public Watchlist createWatchList(User user) {
		Watchlist watchlist=new Watchlist();
		watchlist.setUser(user);
		
		
		return repo.save(watchlist);
	}

	
	@Override
	public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
		Watchlist watchlist=findUserWatchList(user.getId());
		
		if(watchlist.getCoins().contains(coin)) {
			watchlist.getCoins().remove(coin);
		}
		else {
			watchlist.getCoins().add(coin);
		}
		 repo.save(watchlist);
		 return coin;
	}

}
