import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  userFetchReducer,
  uploadImageReducer,
  getUploadedImagesReducer,
  userDescriptionUpdateReducer,
} from "./reducers/userReducers";
import { combineReducers } from "redux";
import {
  askQuestionReducer,
  questionListReducer,
  questionDetailReducer,
  searchReducer,
  userQuestionsReducer,

} from "./reducers/questionReducers";
import {
  uploadImageEnglishReducer,
  uploadImageHistoryReducer,
  uploadImageMathReducer,
  uploadImageScienceReducer,
  uploadImagePhysicsReducer,
  uploadImageCalculusReducer,
  getUploadedImagesEnglishReducer,
  getUploadedImagesHistoryReducer,
  getUploadedImagesMathReducer,
  getUploadedImagesScienceReducer,
  getUploadedImagesPhysicsReducer,
  getUploadedImagesCalculusReducer,
} from "./reducers/subjectReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  questionAsk: askQuestionReducer,
  questionList: questionListReducer,
  userFetch: userFetchReducer,
  questionDetail: questionDetailReducer,
  search: searchReducer,
  userQuestions: userQuestionsReducer,
  uploadImageEnglish: uploadImageEnglishReducer,
  uploadImageHistory: uploadImageHistoryReducer,
  uploadImageMath: uploadImageMathReducer,
  uploadImageScience: uploadImageScienceReducer,
  uploadImagePhysics: uploadImagePhysicsReducer,
  uploadImageCalculus: uploadImageCalculusReducer,
  getUploadedImagesEnglish: getUploadedImagesEnglishReducer,
  getUploadedImagesHistory: getUploadedImagesHistoryReducer,
  getUploadedImagesMath: getUploadedImagesMathReducer,
  getUploadedImagesScience: getUploadedImagesScienceReducer,
  getUploadedImagesPhysics: getUploadedImagesPhysicsReducer,
  getUploadedImagesCalculus: getUploadedImagesCalculusReducer,
  uploadImage: uploadImageReducer,
  getUploadedImages: getUploadedImagesReducer,
  userDescriptionUpdate: userDescriptionUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// const middleware = [thunk]

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
