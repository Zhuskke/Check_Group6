import { GET_USER_POINTS_REQUEST, GET_USER_POINTS_SUCCESS, GET_USER_POINTS_FAIL } from '../constants/pointsConstants';

export const getUserPoints = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_USER_POINTS_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const response = await fetch('/api/user-points/', config);
        const data = await response.json();

        dispatch({
            type: GET_USER_POINTS_SUCCESS,
            payload: data.points,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_POINTS_FAIL,
            payload: error.message,
        });
    }
};
