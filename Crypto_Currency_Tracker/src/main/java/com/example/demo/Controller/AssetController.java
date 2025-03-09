package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Asset;
import com.example.demo.Model.User;
import com.example.demo.Service.AssetService;
import com.example.demo.Service.UserService;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

	@Autowired
	private AssetService assetService;
	
	@Autowired
	private UserService userService;
	

	
	
	@GetMapping("/coin/{coinId}/user")
	public ResponseEntity<Asset> getAssetByUserIdAndCoinId(@PathVariable String coinId, @RequestHeader("Authorization")String jwt) throws Exception{
		
		User user=userService.findUserProfileByJwt(jwt);
		Asset asset=assetService.findAssetByUserIdAndCoinId(user.getId(), coinId);
		
		return ResponseEntity.ok().body(asset);
	}
	
	
	@GetMapping()
	public ResponseEntity<List<Asset>> getAssetForUser(@RequestHeader("Authorization") String jwt)throws Exception{
		User user=userService.findUserProfileByJwt(jwt);
		List<Asset> assets=assetService.getUsersAssets(user.getId());
		
		return ResponseEntity.ok().body(assets);
	}
	
}
