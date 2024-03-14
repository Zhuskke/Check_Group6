import {
  ASK_QUESTION_REQUEST,
  ASK_QUESTION_SUCCESS,
  ASK_QUESTION_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_DETAIL_REQUEST,
  QUESTION_DETAIL_SUCCESS,
  QUESTION_DETAIL_FAIL,
} from "../constants/questionConstants";

export const askQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case ASK_QUESTION_REQUEST:
      return { loading: true };
    case ASK_QUESTION_SUCCESS:
      return { loading: false, success: true, question: action.payload };
    case ASK_QUESTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const questionListReducer = (state = { questions: [] }, action) => {
    switch (action.type) {
      case QUESTION_LIST_REQUEST:
        return { loading: true, questions: [] };
      case QUESTION_LIST_SUCCESS:
        return { loading: false, questions: action.payload };
      case QUESTION_LIST_FAIL:
        return { loading: false, error: action.payload, questions: [] };
      default:
        return state;
    }
  };

  export const questionDetailReducer = (state = { loading: false, error: null, question: {} }, action) => {
    switch (action.type) {
      case QUESTION_DETAIL_REQUEST:
        return { ...state, loading: true, error: null };
      case QUESTION_DETAIL_SUCCESS:
        return { loading: false, question: action.payload, error: null };
      case QUESTION_DETAIL_FAIL:
        return { loading: false, error: action.payload, question: {} };
      default:
        return state;
    }
  };