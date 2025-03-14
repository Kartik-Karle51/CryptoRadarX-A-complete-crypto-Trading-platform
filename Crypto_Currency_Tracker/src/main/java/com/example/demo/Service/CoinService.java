package com.example.demo.Service;

import java.util.List;

import com.example.demo.Model.Coin;

public interface CoinService {

	List<Coin>getCoinList(int page) throws Exception;
	
	String getMarketChart(String coinId,int days) throws Exception;
	
	String getCoinDetails(String coinId) throws Exception;
	
	Coin findById(String coinId)throws Exception;
	
	String searchCoin(String keyword)throws Exception;
	
	String getTop50CoinByMarketCap()throws Exception;
	

	
}
