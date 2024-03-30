import {
    WORKSHEET_REQUEST,
    WORKSHEET_SUCCESS,
    WORKSHEET_FAIL
  } from './worksheetConstants';
  
  export const worksheetListReducer = (state = { worksheets: [] }, action) => {
    switch (action.type) {
      case WORKSHEET_REQUEST:
        return { loading: true, worksheets: [] };
      case WORKSHEET_SUCCESS:
        return { loading: false, worksheets: action.payload };
      case WORKSHEET_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  