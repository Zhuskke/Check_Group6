import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE
 } from '../constants/commentConstants';
const initialState = {
  loading: false,
  error: null,
  comments: []
};
export const createCommentReducer = (state = { loading: false, error: null, comment: null }, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false, comment: action.payload, error: null }; 
    case CREATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null
      };
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};