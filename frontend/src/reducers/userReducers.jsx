import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL, 
    USER_FETCH_REQUEST,
    USER_FETCH_SUCCESS,
    USER_FETCH_FAIL,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    GET_UPLOADED_IMAGES_REQUEST,
    GET_UPLOADED_IMAGES_SUCCESS,
    GET_UPLOADED_IMAGES_FAIL,
    UPDATE_USER_DESCRIPTION_REQUEST,
    UPDATE_USER_DESCRIPTION_SUCCESS,
    UPDATE_USER_DESCRIPTION_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
};
  
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };

  export const userFetchReducer = (state = { loading: false, error: null, users: {} }, action) => {
    switch (action.type) {
        case USER_FETCH_REQUEST:
            return { ...state, loading: true };
        case USER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                users: { ...state.users, [action.payload.userId]: action.payload.username },
            };
        case USER_FETCH_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const uploadImageReducer = (state = { loading: false, error: null, imageUrl: null }, action) => {
    switch (action.type) {
      case UPLOAD_IMAGE_REQUEST:
        return { loading: true, error: null, imageUrl: null };
      case UPLOAD_IMAGE_SUCCESS:
        return { loading: false, error: null, imageUrl: action.payload };
      case UPLOAD_IMAGE_FAIL:
        return { loading: false, error: action.payload, imageUrl: null };
      default:
        return state;
    }
  };
  
  export const getUploadedImagesReducer = (state = { loading: false, error: null, images: [] }, action) => {
    switch (action.type) {
      case GET_UPLOADED_IMAGES_REQUEST:
        return { loading: true, error: null, images: [] };
      case GET_UPLOADED_IMAGES_SUCCESS:
        return { loading: false, error: null, images: action.payload };
      case GET_UPLOADED_IMAGES_FAIL:
        return { loading: false, error: action.payload, images: [] };
      default:
        return state;
    }
  };

  export const userDescriptionUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_USER_DESCRIPTION_REQUEST:
        return { loading: true };
      case UPDATE_USER_DESCRIPTION_SUCCESS:
        return { loading: false, success: action.payload };
      case UPDATE_USER_DESCRIPTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  