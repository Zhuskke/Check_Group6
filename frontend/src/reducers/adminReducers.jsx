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
  TOP_UP_PACKAGE_LIST_REQUEST,
  TOP_UP_PACKAGE_LIST_SUCCESS,
  TOP_UP_PACKAGE_LIST_FAIL,
  TOP_UP_PACKAGE_DETAILS_REQUEST,
  TOP_UP_PACKAGE_DETAILS_SUCCESS,
  TOP_UP_PACKAGE_DETAILS_FAIL,
  TOP_UP_PACKAGE_UPDATE_REQUEST,
  TOP_UP_PACKAGE_UPDATE_SUCCESS,
  TOP_UP_PACKAGE_UPDATE_FAIL,
  TOP_UP_PACKAGE_DELETE_REQUEST,
  TOP_UP_PACKAGE_DELETE_SUCCESS,
  TOP_UP_PACKAGE_DELETE_FAIL,
  TOP_UP_PACKAGE_CREATE_REQUEST,
  TOP_UP_PACKAGE_CREATE_SUCCESS,
  TOP_UP_PACKAGE_CREATE_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_DETAILS_REQUEST,
  COMMENT_DETAILS_SUCCESS,
  COMMENT_DETAILS_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
} from '../constants/adminConstants';

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return { loading: true };
    case USER_CREATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminQuestionListReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case QUESTION_LIST_REQUEST:
      return { loading: true, questions: [] };
    case QUESTION_LIST_SUCCESS:
      return { loading: false, questions: action.payload };
    case QUESTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionDetailsReducer = (state = { question: {} }, action) => {
  switch (action.type) {
    case QUESTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case QUESTION_DETAILS_SUCCESS:
      return { loading: false, question: action.payload };
    case QUESTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_UPDATE_REQUEST:
      return { loading: true };
    case QUESTION_UPDATE_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true };
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const questionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_CREATE_REQUEST:
      return { loading: true };
    case QUESTION_CREATE_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case QUESTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topUpPackageListReducer = (state = { packages: [] }, action) => {
  switch (action.type) {
    case TOP_UP_PACKAGE_LIST_REQUEST:
      return { loading: true, packages: [] };
    case TOP_UP_PACKAGE_LIST_SUCCESS:
      return { loading: false, packages: action.payload };
    case TOP_UP_PACKAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topUpPackageDetailsReducer = (state = { package: {} }, action) => {
  switch (action.type) {
    case TOP_UP_PACKAGE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TOP_UP_PACKAGE_DETAILS_SUCCESS:
      return { loading: false, package: action.payload };
    case TOP_UP_PACKAGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topUpPackageUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_UP_PACKAGE_UPDATE_REQUEST:
      return { loading: true };
    case TOP_UP_PACKAGE_UPDATE_SUCCESS:
      return { loading: false, success: true, package: action.payload };
    case TOP_UP_PACKAGE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topUpPackageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_UP_PACKAGE_DELETE_REQUEST:
      return { loading: true };
    case TOP_UP_PACKAGE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TOP_UP_PACKAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topUpPackageCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_UP_PACKAGE_CREATE_REQUEST:
      return { loading: true };
    case TOP_UP_PACKAGE_CREATE_SUCCESS:
      return { loading: false, success: true, package: action.payload };
    case TOP_UP_PACKAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentListReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case COMMENT_LIST_REQUEST:
      return { loading: true, comments: [] };
    case COMMENT_LIST_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDetailsReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COMMENT_DETAILS_SUCCESS:
      return { loading: false, comment: action.payload };
    case COMMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_REQUEST:
      return { loading: true };
    case COMMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true };
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};