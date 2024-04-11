import axios from 'axios';
import { 
    ACTIVATE_PREMIUM_REQUEST, 
    ACTIVATE_PREMIUM_SUCCESS, 
    ACTIVATE_PREMIUM_FAILURE,
    GET_PREMIUM_DETAILS_REQUEST, 
    GET_PREMIUM_DETAILS_SUCCESS, 
    GET_PREMIUM_DETAILS_FAILURE 
} from '../constants/premiumConstants';

export const activatePremium = (userId) => async (dispatch, getState) => {
  dispatch({ type: ACTIVATE_PREMIUM_REQUEST });

  try {
    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.post(`/api/users/${userId}/activate-subscription/`, null, config);
    dispatch({ type: ACTIVATE_PREMIUM_SUCCESS, payload: response.data });
    // Handle success
  } catch (error) {
    dispatch({ type: ACTIVATE_PREMIUM_FAILURE, error: error.message });
    // Handle error
  }
};

export const getPremiumDetails = () => async (dispatch, getState) => {
  dispatch({ type: GET_PREMIUM_DETAILS_REQUEST });

  try {
    const { userInfo } = getState().userLogin;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/premium-details/`, config);
    const premiumPackage = response.data[0]; // Get the first premium package from the array
    const { description, price } = premiumPackage;

    const premiumDetails = { description, price };

    dispatch({ type: GET_PREMIUM_DETAILS_SUCCESS, payload: premiumDetails });
    return premiumDetails;
  } catch (error) {
    dispatch({ type: GET_PREMIUM_DETAILS_FAILURE, error: error.message });
    throw error;
  }
};
