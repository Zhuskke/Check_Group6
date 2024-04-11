import { 
    ACTIVATE_PREMIUM_REQUEST, 
    ACTIVATE_PREMIUM_SUCCESS, 
    ACTIVATE_PREMIUM_FAILURE,
    GET_PREMIUM_DETAILS_REQUEST, 
    GET_PREMIUM_DETAILS_SUCCESS, 
    GET_PREMIUM_DETAILS_FAILURE
} 
from '../constants/premiumConstants';

export const premiumReducer = (state = { loading: false, error: null }, action) => {
  switch (action.type) {
    case ACTIVATE_PREMIUM_REQUEST:
      return { loading: true, error: null };
    case ACTIVATE_PREMIUM_SUCCESS:
      return { loading: false, error: null };
    case ACTIVATE_PREMIUM_FAILURE:
      return { loading: false, error: action.error };
    default:
      return state;
  }
};

export const premiumDetailsReducer = (state = { premiumDetails: null, loading: false, error: null }, action) => {
  switch (action.type) {
    case GET_PREMIUM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GET_PREMIUM_DETAILS_SUCCESS:
      return { ...state, loading: false, premiumDetails: action.payload, error: null };
    case GET_PREMIUM_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};