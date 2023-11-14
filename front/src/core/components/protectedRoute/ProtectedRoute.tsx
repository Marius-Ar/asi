import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import { Navigate, useLocation } from 'react-router-dom';
import {NotificationType} from "../notification/Notification";
import {useNotification} from "../notification/NotificationContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const location = useLocation();
    const { showNotification } = useNotification();
    useEffect(() => {
        if (!isAuthenticated) {
            showNotification(NotificationType.WARNING, 'Vous devez être connecté pour accéder à cette page');
        }
    }, [isAuthenticated, showNotification]);
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
export default ProtectedRoute;
