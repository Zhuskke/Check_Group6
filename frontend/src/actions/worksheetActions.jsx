import axios from 'axios';
import {
WORKSHEET_LIST_REQUEST,
WORKSHEET_LIST_SUCCESS,
WORKSHEET_LIST_FAIL,
} from '../constants/adminConstants';

export const listWorksheetsUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: WORKSHEET_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo && userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/worksheets/', config);

    dispatch({
      type: WORKSHEET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKSHEET_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};