package com.example.demo.Service;

import java.util.List;

import com.example.demo.Model.Asset;
import com.example.demo.Model.Coin;
import com.example.demo.Model.User;

public interface AssetService {

	Asset createAsset(User user,Coin coin,double quantity);
	
	Asset getAssetById(Long assetId) throws Exception;
	
	
	List<Asset> getUsersAssets(Long userId);
	
	Asset updateAsset(Long assetId,double quantity) throws Exception ;
	
	Asset findAssetByUserIdAndCoinId(Long userId,String coinId);
	
	void deleteAsset(Long assetId);
	
	
}
