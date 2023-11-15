import {Login} from "./pages/login/Login";
import {Register} from './pages/register/Register';
import {Market} from './pages/market/Market';
import gameRoutes from './pages/game/game.routes';
import React from 'react';
import {CardList} from "./pages/user-card/user-card";
import {Navigate} from "react-router-dom";
import ProtectedRoute from "./core/components/protected-route/ProtectedRoute";

const routes = [
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/',
        element: <Navigate replace to="/market"/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/market',
        element: (
            <ProtectedRoute>
                <Market/>
            </ProtectedRoute>
        ),
    },
    {
        path: '/user-card',
        element: (
            <ProtectedRoute>
                <CardList/>
            </ProtectedRoute>
        ),
    },
    gameRoutes
]

export default routes;