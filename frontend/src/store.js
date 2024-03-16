import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import { userLoginReducer, userRegisterReducer, userFetchReducer, userUploadImageReducer } from './reducers/userReducers'
import {combineReducers} from 'redux'
import {askQuestionReducer, questionListReducer, questionDetailReducer, searchReducer } from './reducers/questionReducers'

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    questionAsk: askQuestionReducer,
    questionList: questionListReducer,
    userFetch: userFetchReducer,
    questionDetail: questionDetailReducer,
    search : searchReducer,
    userUploadImage: userUploadImageReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

// const middleware = [thunk]

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store