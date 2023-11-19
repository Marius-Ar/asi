import {
    CLEAR_NOTIFICATION_SESSION,
    NotificationSessionActionTypes,
    SET_NOTIFICATION_SESSION
} from './interfaces/notificationSessionTypes';
import {UUID} from "crypto";

interface NotificationSessionState {
    sessionId: UUID | null;
}

const initialState: NotificationSessionState = {
    sessionId: null
};

export const notificationSessionReducer = (
    state = initialState,
    action: NotificationSessionActionTypes
): NotificationSessionState => {
    switch (action.type) {
        case SET_NOTIFICATION_SESSION:
            return {...state, sessionId: action.payload};
        case CLEAR_NOTIFICATION_SESSION:
            return {...state, sessionId: null};
        default:
            return state;
    }
};

// Action Creators
export const setNotificationSession = (sessionId: UUID): NotificationSessionActionTypes => ({
    type: SET_NOTIFICATION_SESSION,
    payload: sessionId
});

export const clearNotificationSession = (): NotificationSessionActionTypes => ({
    type: CLEAR_NOTIFICATION_SESSION
});
