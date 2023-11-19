import {useNotification} from "./NotificationContext";
import {setNotificationSession} from "../../../store/notificationSessionReducer";
import {NotificationType} from "./Notification";
import {useDispatch} from "react-redux";

const ws = new WebSocket(process.env.REACT_APP_NOTIFICATION_SOCKET_URL as string);

export const useNotificationWebsocket = () => {
    const {showNotification} = useNotification();
    const dispatch = useDispatch();

    ws.onmessage = (e) => {
        console.log("Message received from server: ", e.data);
        const [typeMessage, message] = e.data.split(';');

        if (typeMessage === "init_session") {
            document.cookie = `notificationSessionId=${message}; path=/`;
            dispatch(setNotificationSession(message));
        } else {
            showNotification((typeMessage as string).toLowerCase() as NotificationType, message);
        }
    };

}