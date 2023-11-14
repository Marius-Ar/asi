import React, { useEffect, useState } from 'react';
import './Notification.css';

export enum NotificationType {
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success",
    INFO = "info"
}

type NotificationProps = {
    type: NotificationType;
    message: string;
    duration: number;
};

const Notification = ({ type, message, duration }: NotificationProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className={`notification ${type}`}>
            {message}
            <div className="notification-timeline"></div>

        </div>
    );
};

export default Notification;
