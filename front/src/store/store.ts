import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';

const persistedAuth = localStorage.getItem('auth');
const persistedState = persistedAuth
    ? JSON.parse(persistedAuth)
    : { isAuthenticated: false, userId: null };


const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer, { auth: persistedState });
export type AppState = ReturnType<typeof rootReducer>;

export default store;
