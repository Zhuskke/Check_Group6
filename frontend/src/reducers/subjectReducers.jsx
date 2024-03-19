import {
    UPLOAD_IMAGE_ENGLISH_REQUEST,
    UPLOAD_IMAGE_ENGLISH_SUCCESS,
    UPLOAD_IMAGE_ENGLISH_FAIL,
    GET_UPLOADED_IMAGES_ENGLISH_REQUEST,
    GET_UPLOADED_IMAGES_ENGLISH_SUCCESS,
    GET_UPLOADED_IMAGES_ENGLISH_FAIL,
    UPLOAD_IMAGE_HISTORY_REQUEST,
    UPLOAD_IMAGE_HISTORY_SUCCESS,
    UPLOAD_IMAGE_HISTORY_FAIL,
    GET_UPLOADED_IMAGES_HISTORY_REQUEST,
    GET_UPLOADED_IMAGES_HISTORY_SUCCESS,
    GET_UPLOADED_IMAGES_HISTORY_FAIL,
    UPLOAD_IMAGE_MATH_REQUEST,
    UPLOAD_IMAGE_MATH_SUCCESS,
    UPLOAD_IMAGE_MATH_FAIL,
    GET_UPLOADED_IMAGES_MATH_REQUEST,
    GET_UPLOADED_IMAGES_MATH_SUCCESS,
    GET_UPLOADED_IMAGES_MATH_FAIL,
    UPLOAD_IMAGE_SCIENCE_REQUEST,
    UPLOAD_IMAGE_SCIENCE_SUCCESS,
    UPLOAD_IMAGE_SCIENCE_FAIL,
    GET_UPLOADED_IMAGES_SCIENCE_REQUEST,
    GET_UPLOADED_IMAGES_SCIENCE_SUCCESS,
    GET_UPLOADED_IMAGES_SCIENCE_FAIL,
    UPLOAD_IMAGE_PHYSICS_REQUEST,
    UPLOAD_IMAGE_PHYSICS_SUCCESS,
    UPLOAD_IMAGE_PHYSICS_FAIL,
    GET_UPLOADED_IMAGES_PHYSICS_REQUEST,
    GET_UPLOADED_IMAGES_PHYSICS_SUCCESS,
    GET_UPLOADED_IMAGES_PHYSICS_FAIL,
    UPLOAD_IMAGE_CALCULUS_REQUEST,
    UPLOAD_IMAGE_CALCULUS_SUCCESS,
    UPLOAD_IMAGE_CALCULUS_FAIL,
    GET_UPLOADED_IMAGES_CALCULUS_REQUEST,
    GET_UPLOADED_IMAGES_CALCULUS_SUCCESS,
    GET_UPLOADED_IMAGES_CALCULUS_FAIL,
} from '../constants/subjectConstants';


export const uploadImageEnglishReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_ENGLISH_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_ENGLISH_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_ENGLISH_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesEnglishReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_ENGLISH_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_ENGLISH_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_ENGLISH_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  export const uploadImageHistoryReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_HISTORY_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_HISTORY_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_HISTORY_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesHistoryReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_HISTORY_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_HISTORY_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_HISTORY_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  export const uploadImageMathReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_MATH_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_MATH_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_MATH_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesMathReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_MATH_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_MATH_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_MATH_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  export const uploadImageScienceReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_SCIENCE_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_SCIENCE_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_SCIENCE_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesScienceReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_SCIENCE_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_SCIENCE_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_SCIENCE_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  export const uploadImagePhysicsReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_PHYSICS_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_PHYSICS_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_PHYSICS_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesPhysicsReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_PHYSICS_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_PHYSICS_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_PHYSICS_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  export const uploadImageCalculusReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_CALCULUS_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_CALCULUS_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_CALCULUS_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesCalculusReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_CALCULUS_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_CALCULUS_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_CALCULUS_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  