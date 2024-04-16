import axios from 'axios';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_UPDATE_REQUEST,
  QUESTION_UPDATE_SUCCESS,
  QUESTION_UPDATE_FAIL,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_CREATE_FAIL,
  TOP_UP_PACKAGE_LIST_REQUEST,
  TOP_UP_PACKAGE_LIST_SUCCESS,
  TOP_UP_PACKAGE_LIST_FAIL,
  TOP_UP_PACKAGE_DETAILS_REQUEST,
  TOP_UP_PACKAGE_DETAILS_SUCCESS,
  TOP_UP_PACKAGE_DETAILS_FAIL,
  TOP_UP_PACKAGE_UPDATE_REQUEST,
  TOP_UP_PACKAGE_UPDATE_SUCCESS,
  TOP_UP_PACKAGE_UPDATE_FAIL,
  TOP_UP_PACKAGE_DELETE_REQUEST,
  TOP_UP_PACKAGE_DELETE_SUCCESS,
  TOP_UP_PACKAGE_DELETE_FAIL,
  TOP_UP_PACKAGE_CREATE_REQUEST,
  TOP_UP_PACKAGE_CREATE_SUCCESS,
  TOP_UP_PACKAGE_CREATE_FAIL,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAIL,
  COMMENT_DETAILS_REQUEST,
  COMMENT_DETAILS_SUCCESS,
  COMMENT_DETAILS_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_CREATE_FAIL,
  WORKSHEET_LIST_REQUEST,
  WORKSHEET_LIST_SUCCESS,
  WORKSHEET_LIST_FAIL,
  WORKSHEET_DETAILS_REQUEST,
  WORKSHEET_DETAILS_SUCCESS,
  WORKSHEET_DETAILS_FAIL,
  WORKSHEET_UPDATE_REQUEST,
  WORKSHEET_UPDATE_SUCCESS,
  WORKSHEET_UPDATE_FAIL,
  WORKSHEET_DELETE_REQUEST,
  WORKSHEET_DELETE_SUCCESS,
  WORKSHEET_DELETE_FAIL,
  WORKSHEET_CREATE_REQUEST,
  WORKSHEET_CREATE_SUCCESS,
  WORKSHEET_CREATE_FAIL,
} from '../constants/adminConstants';

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo && userInfo.token}`, 
      },
    };

    const { data } = await axios.get('/api/admin/users/', config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserDetails = (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/admin/users/${userId}/`, config);
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  export const updateUser = (userId, userData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      // Make sure is_premium is included in userData
      const updatedUserData = {
        ...userData,
        is_premium: userData.is_premium || false, // default to false if not provided
      };
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/admin/users/${userId}/`, updatedUserData, config);
  
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  
  export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/admin/users/${userId}/`, config);
  
      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const createUser = (userData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      const { data } = await axios.post('/api/admin/users/', userData, config);
  
      dispatch({
        type: USER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const listQuestions = () => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`, 
        },
      };
  
      const { data } = await axios.get('/api/admin/questions/', config);
  
      dispatch({
        type: QUESTION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const getQuestionDetails = (questionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`, 
        },
      };
  
      const { data } = await axios.get(`/api/admin/questions/${questionId}/`, config);
  
      dispatch({
        type: QUESTION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const updateQuestion = (questionId, questionData, clearAttachment) => async (dispatch, getState) => {
    try {
        dispatch({ type: QUESTION_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo && userInfo.token}`,
                'Content-Type': 'multipart/form-data',
            },
        };

        // If clearAttachment is true, set a flag to indicate clearing the attachment
        if (clearAttachment) {
            questionData.append('clear_attachment', 'true');
        }

        const { data } = await axios.put(`/api/admin/questions/${questionId}/`, questionData, config);

        dispatch({
            type: QUESTION_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch(listQuestions()); // Fetch updated list of questions
    } catch (error) {
        dispatch({
            type: QUESTION_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


  
  
  
  export const deleteQuestion = (questionId) => async (dispatch, getState) => {
    try {
      dispatch({ type: QUESTION_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/admin/questions/${questionId}/`, config);
  
      dispatch({ type: QUESTION_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: QUESTION_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const createQuestion = (questionData) => async (dispatch, getState) => {
    console.log('actions log',questionData)
    try {
      dispatch({ type: QUESTION_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
  
      // Include the user ID in the question data
      const dataWithUserId = {
        ...questionData,
        user: questionData.userId, // Assuming the API expects a 'user' field with the user ID
      };
  
      const { data } = await axios.post('/api/admin/questions/', dataWithUserId, config);
  
      dispatch({
        type: QUESTION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const listTopUpPackages = () => async (dispatch, getState) => {
    try {
      dispatch({ type: TOP_UP_PACKAGE_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo && userInfo.token}`, 
        },
      };
  
      const { data } = await axios.get('/api/admin/top-up-packages/', config);
  
      dispatch({
        type: TOP_UP_PACKAGE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TOP_UP_PACKAGE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const getTopUpPackageDetails = (packageId) => async (dispatch, getState) => {
      try {
        dispatch({ type: TOP_UP_PACKAGE_DETAILS_REQUEST });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo && userInfo.token}`,
          },
        };
    
        const { data } = await axios.get(`/api/admin/top-up-packages/${packageId}/`, config);
    
        dispatch({
          type: TOP_UP_PACKAGE_DETAILS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: TOP_UP_PACKAGE_DETAILS_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  
    export const updateTopUpPackage = (packageId, packageData) => async (dispatch, getState) => {
      try {
        console.log('Updating top-up package with ID:', packageId);
    
        dispatch({ type: TOP_UP_PACKAGE_UPDATE_REQUEST });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo && userInfo.token}`,
            'Content-Type': 'application/json',
          },
        };
    
        // Serialize packageData to JSON
        const jsonData = JSON.stringify(packageData);
    
        const { data } = await axios.put(`/api/admin/top-up-packages/${packageId}/`, jsonData, config);
    
        console.log('Update response:', data);
    
        dispatch({
          type: TOP_UP_PACKAGE_UPDATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        console.error('Update top-up package failed:', error);
    
        dispatch({
          type: TOP_UP_PACKAGE_UPDATE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
    
    
    
    
    
    export const deleteTopUpPackage = (packageId) => async (dispatch, getState) => {
      try {
        dispatch({ type: TOP_UP_PACKAGE_DELETE_REQUEST });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo && userInfo.token}`,
          },
        };
    
        await axios.delete(`/api/admin/top-up-packages/${packageId}/`, config);
    
        dispatch({ type: TOP_UP_PACKAGE_DELETE_SUCCESS });
      } catch (error) {
        dispatch({
          type: TOP_UP_PACKAGE_DELETE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
    export const createTopUpPackage = (packageData) => async (dispatch, getState) => {
      try {
        dispatch({ type: TOP_UP_PACKAGE_CREATE_REQUEST });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo && userInfo.token}`,
          },
        };
    
        const { data } = await axios.post('/api/admin/top-up-packages/', packageData, config);
    
        dispatch({
          type: TOP_UP_PACKAGE_CREATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: TOP_UP_PACKAGE_CREATE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };

    export const listComments = () => async (dispatch, getState) => {
      try {
        dispatch({ type: COMMENT_LIST_REQUEST });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo && userInfo.token}`, 
          },
        };
    
        const { data } = await axios.get('/api/admin/comments/', config);
    
        dispatch({
          type: COMMENT_LIST_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: COMMENT_LIST_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
    
    export const getCommentDetails = (commentId) => async (dispatch, getState) => {
        try {
          dispatch({ type: COMMENT_DETAILS_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
          };
      
          const { data } = await axios.get(`/api/admin/comments/${commentId}/`, config);
      
          dispatch({
            type: COMMENT_DETAILS_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: COMMENT_DETAILS_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
        }
      };
    
    
      export const updateComment = (commentId, commentData) => async (dispatch, getState) => {
        try {
          dispatch({ type: COMMENT_UPDATE_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
          };
      
          const { data } = await axios.put(`/api/admin/comments/${commentId}/`, commentData, config);
      
          dispatch({
            type: COMMENT_UPDATE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: COMMENT_UPDATE_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
        }
      };
      
      export const deleteComment = (commentId) => async (dispatch, getState) => {
        try {
          dispatch({ type: COMMENT_DELETE_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
          };
      
          await axios.delete(`/api/admin/comments/${commentId}/`, config);
      
          dispatch({ type: COMMENT_DELETE_SUCCESS });
        } catch (error) {
          dispatch({
            type: COMMENT_DELETE_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
        }
      };
    
      export const createComment = (commentData) => async (dispatch, getState) => {
        try {
          dispatch({ type: COMMENT_CREATE_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
          };
      
          const { data } = await axios.post('/api/admin/comments/', commentData, config);
      
          dispatch({
            type: COMMENT_CREATE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: COMMENT_CREATE_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          });
        }
      };

      export const listWorksheets = () => async (dispatch, getState) => {
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
      
          const { data } = await axios.get('/api/admin/worksheets/', config);
      
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

      export const getWorksheetDetails = (worksheetId) => async (dispatch, getState) => {
        try {
          dispatch({ type: WORKSHEET_DETAILS_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
          };
      
          const { data } = await axios.get(`/api/admin/worksheets/${worksheetId}/`, config);
      
          dispatch({
            type: WORKSHEET_DETAILS_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: WORKSHEET_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
          });
        }
      };
      
      export const updateWorksheet = (worksheetId, worksheetData) => async (dispatch, getState) => {
        try {
          dispatch({ type: WORKSHEET_UPDATE_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
              'Content-Type': 'multipart/form-data',
            },
          };
      
          const { data } = await axios.put(`/api/admin/worksheets/${worksheetId}/`, worksheetData, config);
      
          dispatch({
            type: WORKSHEET_UPDATE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: WORKSHEET_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
          });
        }
      };
      
      export const deleteWorksheet = (worksheetId) => async (dispatch, getState) => {
        try {
          dispatch({ type: WORKSHEET_DELETE_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
            },
          };
      
          await axios.delete(`/api/admin/worksheets/${worksheetId}/`, config);
      
          dispatch({ type: WORKSHEET_DELETE_SUCCESS });
        } catch (error) {
          dispatch({
            type: WORKSHEET_DELETE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
          });
        }
      };
      
      export const createWorksheet = (worksheetData) => async (dispatch, getState) => {
        try {
          dispatch({ type: WORKSHEET_CREATE_REQUEST });
      
          const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo && userInfo.token}`,
              'Content-Type': 'multipart/form-data',
            },
          };
      
          const { data } = await axios.post('/api/admin/worksheets/', worksheetData, config);
      
          dispatch({
            type: WORKSHEET_CREATE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: WORKSHEET_CREATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
          });
        }
      };