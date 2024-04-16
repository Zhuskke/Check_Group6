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
  userProfileReducer,
  userChangePasswordReducer,
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

import {
  userListReducer,
  userDetailsReducer,
  adminQuestionListReducer,
  topUpPackageListReducer,
  topUpPackageDetailsReducer,
  topUpPackageUpdateReducer,
  topUpPackageDeleteReducer,
  topUpPackageCreateReducer,
  commentListReducer,
  commentDetailsReducer,
  commentUpdateReducer,
  commentDeleteReducer,
  commentCreateReducer,
  worksheetListReducer,
} from './reducers/adminReducers';

import {
  createCommentReducer,
} from "./reducers/commentReducers";

import {
    premiumReducer,
    premiumDetailsReducer,
  } from "./reducers/premiumReducers";
import { updateUserPassword } from "./actions/userActions";

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
    userList: userListReducer,
    userDetails : userDetailsReducer,
    createComment: createCommentReducer,
    questionList: adminQuestionListReducer,
    premium: premiumReducer,
    premiumDetails: premiumDetailsReducer,
    topUpPackageList: topUpPackageListReducer,
    topUpPackageDetails: topUpPackageDetailsReducer,
    topUpPackageUpdate: topUpPackageUpdateReducer,
    topUpPackageDelete: topUpPackageDeleteReducer,
    topUpPackageCreate: topUpPackageCreateReducer,
    commentList: commentListReducer,
    commentDetails: commentDetailsReducer,
    commentUpdate: commentUpdateReducer,
    commentDelete: commentDeleteReducer,
    commentCreate: commentCreateReducer,
    worksheetList: worksheetListReducer,
    updateUserPassword: userChangePasswordReducer,
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
