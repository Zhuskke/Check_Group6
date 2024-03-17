import axios from "axios";
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
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAIL,
} from "../constants/questionConstants";

export const askQuestion = (title, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: ASK_QUESTION_REQUEST });
    
    const {
      userLogin: { userInfo },
    } = getState();
    
    const token = userInfo ? userInfo.token : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
      
    const postDataConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const { data } = await axios.post(
      "/api/questions/",
      { title, content },
      postDataConfig // Use postDataConfig for POST request
    );
    
    dispatch({
      type: ASK_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASK_QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listQuestions = () => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_LIST_REQUEST });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const token = userInfo ? userInfo.token : null;

    const config = token
      ? {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Use template literal to properly include the token
          },
        }
      : {};
    const { data } = await axios.get("/api/questions/", config); // Pass config object to axios.get
  
    dispatch({
      type: QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchQuestionDetail = (questionId) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/questions/${questionId}/`);

    dispatch({
      type: QUESTION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchSearchResults = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SEARCH_RESULTS_REQUEST });
    const { data } = await axios.get(`/api/search?q=${searchTerm}`);
    dispatch({
      type: FETCH_SEARCH_RESULTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SEARCH_RESULTS_FAIL,
      payload: error.message,
    });
  }
};