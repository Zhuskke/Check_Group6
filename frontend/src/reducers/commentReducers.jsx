import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
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
 
 