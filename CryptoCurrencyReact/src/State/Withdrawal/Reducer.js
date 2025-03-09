
import { WITHDRAWAL_REQUEST,  GET_WITHDRAWAL_HISTORY_REQUEST,  WITHDRAWAL_SUCCESS, GET_WITHDRAWAL_HISTORY_SUCCESS,  WITHDRAWAL_FAILURE, GET_WITHDRAWAL_HISTORY_FAILURE,} from "./ActionType";

const initialState = {
    withdrawal: null,
    history: [],
    loading: false,
    error: null,
    paymentDetails: null,
    requests: []
};

const withdrawalReducer = (state = initialState, action) => {
    switch (action.type) {
        case WITHDRAWAL_REQUEST:
       
        case GET_WITHDRAWAL_HISTORY_REQUEST:
        
            return {
                ...state,
                loading: true,
                error: null,
            };
       

        case WITHDRAWAL_SUCCESS:
  return {
    ...state,
    wallet: {
      ...state.wallet,
      userWallet: {
        ...state.wallet.userWallet,
        balance: action.payload.newBalance
      }
    },
    loading: false,
    error: null,
  };
        
            
        
        case GET_WITHDRAWAL_HISTORY_SUCCESS:
            return {
                ...state,
                history: action.payload,
                loading: false,
                error: null,
            };
        

        case WITHDRAWAL_FAILURE:
        case GET_WITHDRAWAL_HISTORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default withdrawalReducer;
