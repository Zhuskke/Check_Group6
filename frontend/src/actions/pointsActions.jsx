import {
  GET_USER_POINTS_REQUEST,
  GET_USER_POINTS_SUCCESS,
  GET_USER_POINTS_FAIL,
  TOP_UP_PACKAGES_REQUEST,
  TOP_UP_PACKAGES_SUCCESS,
  TOP_UP_PACKAGES_FAIL,
  PURCHASE_POINTS_REQUEST,
  PURCHASE_POINTS_SUCCESS,
  PURCHASE_POINTS_FAIL,
  GET_PACKAGE_DETAILS_REQUEST,
  GET_PACKAGE_DETAILS_SUCCESS,
  GET_PACKAGE_DETAILS_FAIL,
} from "../constants/pointsConstants";
import axios from 'axios'

export const getUserPoints = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_POINTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await fetch("/api/user-points/", config);
    const data = await response.json();

    dispatch({
      type: GET_USER_POINTS_SUCCESS,
      payload: data.points,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_POINTS_FAIL,
      payload: error.message,
    });
  }
};

export const getTopUpPackages = () => async (dispatch) => {
    try {
        dispatch({ type: TOP_UP_PACKAGES_REQUEST });

        const { data } = await axios.get('/api/top-up-packages/');
        dispatch({ type: TOP_UP_PACKAGES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TOP_UP_PACKAGES_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const purchasePoints = (packageId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PURCHASE_POINTS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/purchase-points/${packageId}/`, {}, config);
        dispatch({ type: PURCHASE_POINTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PURCHASE_POINTS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const getPackageDetails = (packageId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PACKAGE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/package-details/${packageId}/`);
    
    const { points, price } = data;

    dispatch({
      type: GET_PACKAGE_DETAILS_SUCCESS,
      payload: { points, price }, // Pass points and price as part of the payload
    });
  } catch (error) {
    dispatch({
      type: GET_PACKAGE_DETAILS_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};