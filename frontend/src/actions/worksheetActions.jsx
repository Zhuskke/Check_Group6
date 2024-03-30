import axios from 'axios';
import {
  WORKSHEET_REQUEST,
  WORKSHEET_SUCCESS,
  WORKSHEET_FAIL
} from './worksheetConstants';

export const listWorksheets = () => async (dispatch) => {
  try {
    dispatch({ type: WORKSHEET_REQUEST });

    const { data } = await axios.get('/api/worksheets'); // Replace with your backend endpoint to fetch worksheets

    dispatch({
      type: WORKSHEET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKSHEET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
