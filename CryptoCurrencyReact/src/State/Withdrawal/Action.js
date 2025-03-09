import api from "@/config/api";
import {GET_WITHDRAWAL_HISTORY_FAILURE, GET_WITHDRAWAL_HISTORY_REQUEST, GET_WITHDRAWAL_HISTORY_SUCCESS,  WITHDRAWAL_FAILURE, WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS } from "./ActionType";




export const withdrawalRequest = ({ amount, jwt }) => async dispatch => {
    dispatch({ type: WITHDRAWAL_REQUEST });
    try {
      const response = await api.post(`/api/withdrawal/${amount}`, null, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
  
      console.log("Withdrawal: ", response.data);
  
    
      const newBalance = wallet.userWallet.balance - parseFloat(amount); 
      dispatch({
        type: WITHDRAWAL_SUCCESS,
        payload: { ...response.data, newBalance } 
      });
      
    } catch (error) {
      dispatch({
        type: WITHDRAWAL_FAILURE,
        payload: error.message
      });
    }
  };


export const getWithdrawalHistory=jwt=>async dispatch=>{

    dispatch({type:GET_WITHDRAWAL_HISTORY_REQUEST});
    try{

        const response=await api.get('/api/withdrawal',{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        console.log("Get Withdrawal History : ",response.data);
        dispatch({
            type:GET_WITHDRAWAL_HISTORY_SUCCESS,
            payload:response.data
        });
    }catch(error){
        dispatch(
            {
                type:GET_WITHDRAWAL_HISTORY_FAILURE,
                payload:error.message
            }
        );
    }
};

// dispatch({type:GET_PAYMENT_DETAILS_REQUEST});
// try{
//     const response=await api.get(`/api/payment-details`,{
//         headers:{Authorization:`Bearer ${jwt}`}
//     });
// console.log("Get Payment Details :",response.data);
// dispatch({
//     type:GET_PAYMENT_DETAILS_SUCCESS,
//     payload:response.data
// });
// }catch(error){
//     console.log("Error : ",error);
//     dispatch({
//         type:GET_PAYMENT_DETAILS_FAILURE,
//         error:error.message
//     });
// }
// };