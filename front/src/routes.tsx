import {Login} from "./pages/login/Login";
import React from 'react';
import {Register} from './pages/register/Register';
import {Market} from './pages/market/Market';
import {Game} from './pages/Game/Game'

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
        element: <Market/>,
    },
    {
        path: '/game',
        element: <Game/>
    }
]

export default routes;