import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import { userLoginReducer } from './constants/userConstants'
import {combineReducers} from 'redux'

const reducer = combineReducers({
    userLogin : userLoginReducer
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