import api from "@/config/api";
import { GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, PAY_ORDER_FAILURE, PAY_ORDER_REQUEST, PAY_ORDER_SUCCESS } from "./ActionType"


export const payOrder = ({ jwt, orderData, amount }) => async (dispatch) => {
    dispatch({ type: PAY_ORDER_REQUEST });

    try {
        const response = await api.post("/api/orders/pay", orderData, {
            headers: { Authorization: `Bearer ${jwt}` },
        });

        dispatch({ type: PAY_ORDER_SUCCESS, payload: response.data, amount });

        console.log("Order Success: ", response.data);

        if (orderData.orderType === "SELL") {
            await dispatch(getUserWallet(jwt));
            await dispatch(getUserAssets(jwt));  //updates the asset quantity
        }

    } catch (error) {
        console.log("Error: ", error);
        dispatch({ type: PAY_ORDER_FAILURE, error: error.message });
    }
};




export const getAllOrdersForUser =({jwt,orderType,assetSymbol})=>async (dispatch)=>{
dispatch({type:GET_ALL_ORDERS_REQUEST});
try{
const response=await api.get('/api/orders',{
    headers:{
        Authorization:`Bearer ${jwt}`
    },
    params:{
        order_type:orderType,
        asset_symbol:assetSymbol,
    },
});
dispatch({
    type:GET_ALL_ORDERS_SUCCESS,
    payload:response.data,
});
console.log("Order Success : ",response.data);
}catch(error){
console.log("Error : ",error);
dispatch({
    type:GET_ALL_ORDERS_FAILURE,
    error:error.message
});
}
};

