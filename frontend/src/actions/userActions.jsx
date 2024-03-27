import axios from 'axios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAIL,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    GET_UPLOADED_IMAGES_REQUEST,
    GET_UPLOADED_IMAGES_SUCCESS,
    GET_UPLOADED_IMAGES_FAIL,
    UPDATE_USER_DESCRIPTION_REQUEST,
    UPDATE_USER_DESCRIPTION_SUCCESS,
    UPDATE_USER_DESCRIPTION_FAIL,
    FETCH_USER_DESCRIPTION_REQUEST,
    FETCH_USER_DESCRIPTION_SUCCESS,
    FETCH_USER_DESCRIPTION_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        );
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        });
    }
};

export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/register/',
            { username, email, password },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data, 
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
        return data; // Return the user data
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
        throw error;
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userDescription');
    dispatch({ type: USER_LOGOUT });
};


export const fetchUser = (userId) => async (dispatch) => {
    try {
        dispatch({ type: USER_FETCH_REQUEST });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.access_token : null;

        const config = token
            ? {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
            : {};
        const { data } = await axios.get(`/api/users/${userId}/`, config);
        dispatch({
            type: USER_FETCH_SUCCESS,
            payload: { userId, username: data.username },
        });
    } catch (error) {
        dispatch({
            type: USER_FETCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const uploadImage = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImages = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const fetchUserDescription = () => async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_USER_DESCRIPTION_REQUEST });
  
      const userInfo = getState().userLogin.userInfo;
      const token = userInfo ? userInfo.token : null;
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const { data } = await axios.get('/api/user-description/', config);
  
      dispatch({ type: FETCH_USER_DESCRIPTION_SUCCESS, payload: data.description });
    } catch (error) {
      dispatch({ type: FETCH_USER_DESCRIPTION_FAIL, payload: error.message });
    }
  };
  
  export const updateUserDescription = (description) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_DESCRIPTION_REQUEST });
  
      const userInfo = getState().userLogin.userInfo;
      const token = userInfo ? userInfo.token : null;
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
  
      const { data } = await axios.put('/api/update-description/', { description }, config);
  
      dispatch({ type: UPDATE_USER_DESCRIPTION_SUCCESS, payload: data.description });
    } catch (error) {
      dispatch({ type: UPDATE_USER_DESCRIPTION_FAIL, payload: error.message });
    }
  };