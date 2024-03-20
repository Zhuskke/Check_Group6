import { GET_USER_POINTS_REQUEST, GET_USER_POINTS_SUCCESS, GET_USER_POINTS_FAIL } from '../constants/pointsConstants';

export const userPointsReducer = (state = { points: 0, loading: false, error: null }, action) => {
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
