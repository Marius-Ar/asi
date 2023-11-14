import {Action} from "redux";

interface AuthState {
    isAuthenticated: boolean;
    userId: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userId: null,
};

interface SetAuthAction extends Action {
    type: 'SET_AUTH';
    payload: AuthState;
}

type AuthActions = SetAuthAction;

// authReducer.ts
function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case 'SET_AUTH':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                userId: action.payload.userId,
            };
        default:
            return state;
    }
}


export default authReducer;
