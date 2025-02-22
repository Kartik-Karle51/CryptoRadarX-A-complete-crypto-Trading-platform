import api from "@/config/api";
import { ADD_COIN_TO_WATCHLIST_FAILURE, ADD_COIN_TO_WATCHLIST_REQUEST, ADD_COIN_TO_WATCHLIST_SUCCESS, GET_USER_WATCHLIST_FAILURE, GET_USER_WATCHLIST_REQUEST, GET_USER_WATCHLIST_SUCCESS } from "./ActionType";


export const getUserWatchlist=(jwt)=> async (dispatch)=>{
    
dispatch({type:GET_USER_WATCHLIST_REQUEST});
try{
const response=await api.get(`/api/watchlist/user`,{
    headers:{
        Authorization:`Bearer ${jwt}`,
    },
});
dispatch({
    type:GET_USER_WATCHLIST_SUCCESS,
    payload:response.data,
});
console.log("GET USER WATCHLIST :",response.data);
}catch(error){
    console.log("Error : ",error);
    dispatch({
        type:GET_USER_WATCHLIST_FAILURE,
        error:error.message,
    });
}
};


export const addItemToWatchlist = ({coinId,jwt})=>async (dispatch)=>{
    dispatch({type:ADD_COIN_TO_WATCHLIST_REQUEST});
    try{
const response=await api.patch(`/api/watchlist/add/coin/${coinId}`,{},{
    headers:{
        Authorization:`Bearer ${jwt}`
    },
});
dispatch({
    type:ADD_COIN_TO_WATCHLIST_SUCCESS,
    payload:response.data,
});
console.log("ADD ITEM TO WATCHLIST : ",response.data);
    }catch(error){
        console.log("Error : ",error);
        dispatch({
            type:ADD_COIN_TO_WATCHLIST_FAILURE,
            error:error.message,
        });
    }
}