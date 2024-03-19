import axios from 'axios';
import {
    UPLOAD_IMAGE_ENGLISH_REQUEST,
    UPLOAD_IMAGE_ENGLISH_SUCCESS,
    UPLOAD_IMAGE_ENGLISH_FAIL,
    GET_UPLOADED_IMAGES_ENGLISH_REQUEST,
    GET_UPLOADED_IMAGES_ENGLISH_SUCCESS,
    GET_UPLOADED_IMAGES_ENGLISH_FAIL,
    UPLOAD_IMAGE_HISTORY_REQUEST,
    UPLOAD_IMAGE_HISTORY_SUCCESS,
    UPLOAD_IMAGE_HISTORY_FAIL,
    GET_UPLOADED_IMAGES_HISTORY_REQUEST,
    GET_UPLOADED_IMAGES_HISTORY_SUCCESS,
    GET_UPLOADED_IMAGES_HISTORY_FAIL,
    UPLOAD_IMAGE_MATH_REQUEST,
    UPLOAD_IMAGE_MATH_SUCCESS,
    UPLOAD_IMAGE_MATH_FAIL,
    GET_UPLOADED_IMAGES_MATH_REQUEST,
    GET_UPLOADED_IMAGES_MATH_SUCCESS,
    GET_UPLOADED_IMAGES_MATH_FAIL,
    UPLOAD_IMAGE_SCIENCE_REQUEST,
    UPLOAD_IMAGE_SCIENCE_SUCCESS,
    UPLOAD_IMAGE_SCIENCE_FAIL,
    GET_UPLOADED_IMAGES_SCIENCE_REQUEST,
    GET_UPLOADED_IMAGES_SCIENCE_SUCCESS,
    GET_UPLOADED_IMAGES_SCIENCE_FAIL,
    UPLOAD_IMAGE_PHYSICS_REQUEST,
    UPLOAD_IMAGE_PHYSICS_SUCCESS,
    UPLOAD_IMAGE_PHYSICS_FAIL,
    GET_UPLOADED_IMAGES_PHYSICS_REQUEST,
    GET_UPLOADED_IMAGES_PHYSICS_SUCCESS,
    GET_UPLOADED_IMAGES_PHYSICS_FAIL,
    UPLOAD_IMAGE_CALCULUS_REQUEST,
    UPLOAD_IMAGE_CALCULUS_SUCCESS,
    UPLOAD_IMAGE_CALCULUS_FAIL,
    GET_UPLOADED_IMAGES_CALCULUS_REQUEST,
    GET_UPLOADED_IMAGES_CALCULUS_SUCCESS,
    GET_UPLOADED_IMAGES_CALCULUS_FAIL,
} from '../constants/subjectConstants';

export const uploadImageEnglish = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_ENGLISH_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_ENGLISH_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_ENGLISH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImagesEnglish = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_ENGLISH_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_ENGLISH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_ENGLISH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const uploadImageHistory = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_HISTORY_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_HISTORY_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_HISTORY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImagesHistory = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_HISTORY_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_HISTORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_HISTORY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const uploadImageMath = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_MATH_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_MATH_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_MATH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImagesMath = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_MATH_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_MATH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_MATH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const uploadImageScience = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_SCIENCE_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_SCIENCE_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_SCIENCE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImagesScience = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_SCIENCE_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_SCIENCE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_SCIENCE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const uploadImagePhysics = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_PHYSICS_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_PHYSICS_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_PHYSICS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImagesPhysics = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_PHYSICS_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_PHYSICS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_PHYSICS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const uploadImageCalculus = (image) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_CALCULUS_REQUEST });
  
      const formData = new FormData();
      formData.append('image', image);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/users/upload-image/', formData, config);
  
      dispatch({ type: UPLOAD_IMAGE_CALCULUS_SUCCESS, payload: data.imageUrl });
    } catch (error) {
      dispatch({
        type: UPLOAD_IMAGE_CALCULUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getUploadedImagesCalculus = () => async (dispatch, getState) => {
    try {
      dispatch({ type: GET_UPLOADED_IMAGES_CALCULUS_REQUEST });
  
      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
        },
      };
  
      const { data } = await axios.get('/api/users/uploaded-images/', config);
  
      dispatch({ type: GET_UPLOADED_IMAGES_CALCULUS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_UPLOADED_IMAGES_CALCULUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };