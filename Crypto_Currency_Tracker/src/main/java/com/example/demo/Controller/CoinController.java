package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.example.demo.Model.Coin;
import com.example.demo.Service.CoinService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/coins")
public class CoinController {

	@Autowired
	private CoinService coinService;
	
	@Autowired
	private ObjectMapper mapper;
	
	
	
	@GetMapping()
	public ResponseEntity<List<Coin>>getCoinList(@RequestParam(required = false, name = "page")int page) throws Exception,HttpClientErrorException{
		List<Coin>coins=coinService.getCoinList(page);
		return new ResponseEntity<List<Coin>>(coins,HttpStatus.ACCEPTED);
	}
	
	
	
	
	@GetMapping("/{coinId}/chart")
	public ResponseEntity<JsonNode>getMarketChart(@PathVariable String coinId,@RequestParam("days")int days) throws Exception{
		String res=coinService.getMarketChart(coinId, days);
		
		JsonNode jsonNode=mapper.readTree(res);
		return new ResponseEntity<>(jsonNode,HttpStatus.ACCEPTED);
	}
	 
	
	@GetMapping("/search")
	ResponseEntity<JsonNode>searchCoin(@RequestParam("g")String keyword)throws Exception ,HttpClientErrorException{
		String coin=coinService.searchCoin(keyword);
		JsonNode jsonNode=mapper.readTree(coin);
		
		return ResponseEntity.ok(jsonNode);
	}
	
	
	@GetMapping("/top50")
	public ResponseEntity<JsonNode>getTop50CoinsByMarketCapRank()throws Exception,HttpClientErrorException{
		String coins =coinService.getTop50CoinByMarketCap();
		
		JsonNode jsonNode=mapper.readTree(coins);
		
		return ResponseEntity.ok(jsonNode);
	}
	
	
	@GetMapping("/details/{coinId}")
	ResponseEntity<JsonNode>getCoinDetails(@PathVariable String coinId)throws Exception,HttpClientErrorException{
		String coin=coinService.getCoinDetails(coinId);
		
		JsonNode jsonNode=mapper.readTree(coin);
		
		return ResponseEntity.ok(jsonNode);
	}
	
}
