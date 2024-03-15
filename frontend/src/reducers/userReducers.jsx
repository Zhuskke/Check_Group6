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

