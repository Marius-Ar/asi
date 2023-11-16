import {combineReducers, createStore} from 'redux';
import authReducer from './authReducer';
import userReducer from './userDetailReducer';

function getUserIdFromCookie() {
    const userIdCookie = document.cookie.split('; ').find(row => row.startsWith('userId='));
    return userIdCookie ? userIdCookie.split('=')[1] : null;
}

const initialState = {
    isAuthenticated: getUserIdFromCookie() !== null,
    userId: getUserIdFromCookie(),
};

const rootReducer = combineReducers({
    auth: authReducer,
    userDetail: userReducer,
});

const store = createStore(rootReducer, {auth: initialState});
export type AppState = ReturnType<typeof rootReducer>;

export default store;
