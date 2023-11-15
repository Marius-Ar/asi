import {useNotification} from "./NotificationContext";
import {NotificationType} from "./Notification";

const ws = new WebSocket(process.env.REACT_APP_NOTIFICATION_SOCKET_URL as string);

export const useNotificationWebsocket = () => {
    const {showNotification} = useNotification();

    ws.onmessage = (e) => {
        const [typeMessage, message] = e.data.split(';');
        showNotification((typeMessage as string).toLowerCase() as NotificationType, message);
    }
}