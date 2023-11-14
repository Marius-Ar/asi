import {Login} from "./pages/login/Login";
import React from 'react';
import {Register} from './pages/register/Register';
import {Market} from './pages/market/Market';
import ProtectedRoute from "./core/components/protectedRoute/ProtectedRoute";
import {CardList} from "./pages/user-card/user-card";

const routes = [
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/market',
        element:  ( <ProtectedRoute>
            <Market/>
        </ProtectedRoute>),
    },
    {
        path: '/user-card',
        element:  ( <ProtectedRoute>
            <CardList/>
        </ProtectedRoute>),
    }
]

export default routes;