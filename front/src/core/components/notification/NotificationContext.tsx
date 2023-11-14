import React, {createContext, useContext, useState, ReactNode, useCallback} from 'react';
import Notification, {NotificationType} from './Notification'; //

type NotificationContextType = {
    showNotification: (type: NotificationType, message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

type NotificationProviderProps = {
    children: ReactNode;
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({children}: NotificationProviderProps) => {
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: NotificationType.INFO
    });

    const showNotification = useCallback((type: NotificationType, message: string) => {
        setNotification({type, message, visible: true});
        setTimeout(() => {
            setNotification({...notification, visible: false});
        }, 4500);
    }, [notification]);

    return (
        <NotificationContext.Provider value={{showNotification}}>
            {children}
            {notification.visible &&
                <Notification
                    type={notification.type}
                    message={notification.message}
                    duration={3000}
                />
            }
        </NotificationContext.Provider>
    );
};
