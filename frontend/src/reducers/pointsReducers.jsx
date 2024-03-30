import {
  GET_USER_POINTS_REQUEST,
  GET_USER_POINTS_SUCCESS,
  GET_USER_POINTS_FAIL,
  TOP_UP_PACKAGES_REQUEST,
  TOP_UP_PACKAGES_SUCCESS,
  TOP_UP_PACKAGES_FAIL,
  PURCHASE_POINTS_REQUEST,
  PURCHASE_POINTS_SUCCESS,
  PURCHASE_POINTS_FAIL,
  GET_PACKAGE_DETAILS_REQUEST,
  GET_PACKAGE_DETAILS_SUCCESS,
  GET_PACKAGE_DETAILS_FAIL,
} from "../constants/pointsConstants";

const initialState = {
  packageDetails: { points: 0, price: 0 },
  loading: false,
  error: null,
};

export const userPointsReducer = (
  state = { points: 0, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_USER_POINTS_REQUEST:
      return { ...state, loading: true };
    case GET_USER_POINTS_SUCCESS:
      return { loading: false, points: action.payload, error: null };
    case GET_USER_POINTS_FAIL:
      return { loading: false, points: 0, error: action.payload };
    default:
      return state;
  }
};

export const topUpPackagesReducer = (state = { packages: [], loading: false, error: null }, action) => {
    switch (action.type) {
        case TOP_UP_PACKAGES_REQUEST:
            return { ...state, loading: true };
        case TOP_UP_PACKAGES_SUCCESS:
            return { loading: false, packages: action.payload, error: null };
        case TOP_UP_PACKAGES_FAIL:
            return { loading: false, packages: [], error: action.payload };
        default:
            return state;
    }
};

export const purchasePointsReducer = (state = { loading: false, error: null }, action) => {
    switch (action.type) {
        case PURCHASE_POINTS_REQUEST:
            return { loading: true, error: null };
        case PURCHASE_POINTS_SUCCESS:
            return { loading: false, error: null };
        case PURCHASE_POINTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PACKAGE_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PACKAGE_DETAILS_SUCCESS:
      return { ...state, loading: false, packageDetails: action.payload, error: null };
    case GET_PACKAGE_DETAILS_FAIL:
      return { ...state, loading: false, packageDetails: { points: 0, price: 0 }, error: action.payload };
    default:
      return state;
  }
};