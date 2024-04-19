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
  FETCH_COMMENT_DETAILS_REQUEST,
  FETCH_COMMENT_DETAILS_SUCCESS,
  FETCH_COMMENT_DETAILS_FAILURE
 } from '../constants/commentConstants';
const initialState = {
  loading: false,
  error: null,
  userPoints: null,
  message: null,
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

export const createCommentVoteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_VOTE_REQUEST:
      return { loading: true };
    case CREATE_COMMENT_VOTE_SUCCESS:
      return { loading: false, success: true, commentVote: action.payload };
    case CREATE_COMMENT_VOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POINTS_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_POINTS_SUCCESS:
      const { userPoints, message, comments } = action.payload;
      return { ...state, loading: false, userPoints, message, comments };

    case UPDATE_POINTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const commentProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COMMENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        commentDetails: action.payload,
        error: null
      };

    case FETCH_COMMENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};