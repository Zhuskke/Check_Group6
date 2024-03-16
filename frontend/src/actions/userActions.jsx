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
    USER_UPLOAD_IMAGE_REQUEST,
    USER_UPLOAD_IMAGE_SUCCESS,
    USER_UPLOAD_IMAGE_FAIL,
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
            payload: data, // Dispatch the user data upon successful registration
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

export const uploadImage = (image) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPLOAD_IMAGE_REQUEST });
        const formData = new FormData();
        formData.append('image', image);
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token : null; // Ensure you're retrieving the token correctly
        if (!token) {
            throw new Error('No authentication token found');
        }
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`/api/users/upload-image/`, formData, config);
        const imageUrl = response.data.imageUrl; // Assuming imageUrl is returned from the server
        dispatch({ 
            type: USER_UPLOAD_IMAGE_SUCCESS,
            payload: imageUrl 
        });
    } catch (error) {
        dispatch({
            type: USER_UPLOAD_IMAGE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
