
import axios from "axios";
import { FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS, SEARCH_COIN__FAILURE, SEARCH_COIN__REQUEST, SEARCH_COIN__SUCCESS } from "./ActionType";
import api, { API_BASE_URL } from "@/config/api";


export const getCoinList = (page) => async(dispatch)=>{
    dispatch({type:FETCH_COIN_LIST_REQUEST})
const baseUrl="http://localhost:8080"
    try{
const data=await axios.get(`${baseUrl}/coins?page=${page}`);

console.log("coin list",data);
dispatch({type:FETCH_COIN_LIST_SUCCESS,payload:data.data})

    }catch(error){
        
            dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
            // alert("Too many requests, please try again later.");
        
    }
};

export const getTop50CoinList=()=>async(dispatch)=>{
dispatch({type:FETCH_TOP_50_COINS_REQUEST});
try{
    const response=await axios.get(`${API_BASE_URL}/coins/top50`);
    dispatch({type:FETCH_TOP_50_COINS_SUCCESS,payload:response.data});
    console.log("Top 50 ",response.data)
}catch(error){
   
        dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
        // alert("Too many requests, please try again later.");

}
};

export const fetchMarketChart=({coinId,days,jwt})=>async(dispatch)=>{
dispatch({type:FETCH_MARKET_CHART_REQUEST});
try{
    const response=await api.get(`/coins/${coinId}/chart?days=${days}`,{    //Here we don't need to give base url because we gave it in Api.js file
        headers:{
            Authorization:`Bearer ${jwt}`
        }
    });
    dispatch({type:FETCH_MARKET_CHART_SUCCESS ,payload:response.data});
    console.log("CHART ",response.data);
}catch(error){
    console.log("Error : ",error)
    dispatch({type:FETCH_MARKET_CHART_FAILURE,payload:error.message});
}
};


export const fetchCoinDetails=({coinId,jwt})=>async (dispatch)=>{
    dispatch({type:FETCH_COIN_DETAILS_REQUEST});
    try{
const response=await api.get(`/coins/details/${coinId}`,{
    headers:{
        Authorization:`Bearer ${jwt}`
    }
});
dispatch({type:FETCH_COIN_DETAILS_SUCCESS,payload:response.data});
console.log("Coin Details ",response.data);
    }catch(error){
console.log("Error :",error);
dispatch({type:FETCH_COIN_DETAILS_FAILURE,payload:error.message});
    }
};

export const searchCoin=(keyword)=>async (dispatch)=>{
dispatch({type:SEARCH_COIN__REQUEST});
try{
const response=await api.get(`/coins/search?q=${keyword}`);
dispatch({type:SEARCH_COIN__SUCCESS,payload:response.data});
console.log("Search Coin : ",response.data);
}catch(error){
    console.log("Error :",error);
    dispatch({type:SEARCH_COIN__FAILURE,payload:error.message});
}
};