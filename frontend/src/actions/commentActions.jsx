import axios from 'axios';
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  CREATE_COMMENT_VOTE_REQUEST,
  CREATE_COMMENT_VOTE_SUCCESS,
  CREATE_COMMENT_VOTE_FAIL,
  UPDATE_POINTS_REQUEST,
  UPDATE_POINTS_SUCCESS,
  UPDATE_POINTS_FAILURE,
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

export const createCommentVote = (user_id, comment_id, vote_type) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COMMENT_VOTE_REQUEST });
    

    const { data } = await axios.post('/api/create_comment_vote/', { user_id, comment_id, vote_type });

    dispatch({
      type: CREATE_COMMENT_VOTE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_VOTE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message
    });
  }
};

export const updatePoints = (userId) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_POINTS_REQUEST });

    try {
      const response = await axios.get('/api/update_points_on_upvote/', { params: { user_id: userId } });

      const { user_id, comments, message } = response.data;
      const userPoints = message ? 50 : null; // If message exists, points were awarded

      dispatch({
        type: UPDATE_POINTS_SUCCESS,
        payload: { userPoints, message, comments },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_POINTS_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};