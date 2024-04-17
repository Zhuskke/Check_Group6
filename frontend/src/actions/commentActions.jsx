import axios from 'axios';
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
} from '../constants/commentConstants';
export const createComment = (formData, questionId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    
    const {
      userLogin: { userInfo },
    } = getState();
    
    const token = userInfo ? userInfo.token : null;

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      : {};
    
    const { data } = await axios.post(`/api/comments/${questionId}/`, formData, config); 
    
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCommentsForQuestion = (questionId) => {
  return async (dispatch) => {
    dispatch({ type: GET_COMMENTS_REQUEST });

    try {
      const response = await axios.get(`/api/question/${questionId}/comments/`);
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: response.data.comments
      });
      console.log(response.data.comments);
    } catch (error) {
      dispatch({
        type: GET_COMMENTS_FAILURE,
        payload: error.response ? error.response.data : 'Failed to fetch comments'
      });
    }
  };
};