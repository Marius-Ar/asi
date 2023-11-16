import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/semantic-ui-css/semantic.min.css';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {NotificationProvider} from './core/components/notification/NotificationContext';
import {Provider} from "react-redux";
import store from "./store/store";
import {Header} from "./core/components/header/Header"
import {Register} from "./pages/register/Register";
import ProtectedRoute from "./core/components/protected-route/ProtectedRoute";
import {CardList} from "./pages/user-card/user-card";
import {Market} from "./pages/market/Market";
import {Login} from "./pages/login/Login";
import gameRoutes from "./pages/game/game.routes";


ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <Provider store={store}>
        <NotificationProvider>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/market"/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/market" element={<ProtectedRoute>
                        <Market/>
                    </ProtectedRoute>}/>
                    <Route path="/user-card" element={<ProtectedRoute>
                        <CardList/>
                    </ProtectedRoute>}/>
                    <Route path={gameRoutes.children[0].path} element={gameRoutes.children[0].element}/>

                </Routes>
            </BrowserRouter>
        </NotificationProvider>
    </Provider>
);
