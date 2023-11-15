import {combineReducers, createStore} from 'redux';
import authReducer from './authReducer';
import userReducer from './userDetailReducer';

const persistedAuth = localStorage.getItem('auth');
const persistedState = persistedAuth
    ? JSON.parse(persistedAuth)
    : {isAuthenticated: false, userId: null};


const rootReducer = combineReducers({
    auth: authReducer,
    userDetail: userReducer,
});

const store = createStore(rootReducer, {auth: persistedState});
export type AppState = ReturnType<typeof rootReducer>;

export default store;
