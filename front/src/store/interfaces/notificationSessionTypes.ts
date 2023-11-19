import {UUID} from "crypto";

export const SET_NOTIFICATION_SESSION = 'SET_NOTIFICATION_SESSION';
export const CLEAR_NOTIFICATION_SESSION = 'CLEAR_NOTIFICATION_SESSION';

export interface SetNotificationSessionAction {
    type: typeof SET_NOTIFICATION_SESSION;
    payload: UUID
}

export interface ClearNotificationSessionAction {
    type: typeof CLEAR_NOTIFICATION_SESSION;
}

export type NotificationSessionActionTypes = SetNotificationSessionAction | ClearNotificationSessionAction;
