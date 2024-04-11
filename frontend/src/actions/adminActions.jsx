import axios from 'axios';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
} from '../constants/adminConstants';

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo && userInfo.token}`, 
      },
    };

    const { data } = await axios.get('/api/admin/users/', config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserDetails = (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/admin/users/${userId}/`, config);
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  export const updateUser = (userId, userData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/admin/users/${userId}/`, userData, config);
  
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/admin/users/${userId}/`, config);
  
      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const createUser = (userData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/admin/users/', userData, config);
  
      dispatch({
        type: USER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const listQuestions = () => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`, 
        },
      };
  
      const { data } = await axios.get('/api/admin/questions/', config);
  
      dispatch({
        type: QUESTION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const getQuestionDetails = (questionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`, 
        },
      };
  
      const { data } = await axios.get(`/api/admin/questions/${questionId}/`, config);
  
      dispatch({
        type: QUESTION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const updateQuestion = (questionId, questionData) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
  
      const { data } = await axios.put(`/api/admin/questions/${questionId}/`, questionData, config);
  
      dispatch({
        type: QUESTION_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const deleteQuestion = (questionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/admin/questions/${questionId}/`, config);
  
      dispatch({ type: QUESTION_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: QUESTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const createQuestion = (questionData) => async (dispatch, getState) => {
    console.log('actions log',questionData)
    try {
      dispatch({ type: QUESTION_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // Include the user ID in the question data
      const dataWithUserId = {
        ...questionData,
        user: questionData.userId, // Assuming the API expects a 'user' field with the user ID
      };
  
      const { data } = await axios.post('/api/admin/questions/', dataWithUserId, config);
  
      dispatch({
        type: QUESTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  