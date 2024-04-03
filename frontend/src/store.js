  import { configureStore } from "@reduxjs/toolkit";
  import { thunk } from "redux-thunk";
  import {
    userLoginReducer,
    userRegisterReducer,
    userFetchReducer,
    uploadImageReducer,
    getUploadedImagesReducer,
    userDescriptionReducer,
    getProfileImageReducer,
    uploadProfileImageReducer,
    userProfileReducer
  } from "./reducers/userReducers";
  import { combineReducers } from "redux";
  import {
    askQuestionReducer,
    questionListReducer,
    questionDetailReducer,
    searchReducer,
    userQuestionsReducer,
    deleteQuestionReducer,
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

  import {
    userPointsReducer,
    topUpPackagesReducer,
    purchasePointsReducer,
    packageReducer,
  } from "./reducers/pointsReducers";

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
    userPoints: userPointsReducer,
    deleteQuestion: deleteQuestionReducer,
    userDescription: userDescriptionReducer,
    topUpPackages: topUpPackagesReducer,
    purchasePoints: purchasePointsReducer,
    package: packageReducer,
    getProfileImage: getProfileImageReducer,
    uploadProfileImage: uploadProfileImageReducer,
    userProfile: userProfileReducer,
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
