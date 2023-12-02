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
import {Market} from "./pages/market/Market";
import {Login} from "./pages/login/Login";
import {CardList} from './pages/user-card/UserCard';
import {JoinGame} from './pages/game/components/JoinGame';
import {ChooseCards} from './pages/game/components/ChooseCards';
import {Fight} from './pages/game/components/Fight';

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
                    <Route path="/market" element={protectRoute(<Market/>)}/>
                    <Route path="/user-card" element={protectRoute(<CardList/>)}/>

                    <Route path="/game">
                        <Route path="join" element={protectRoute(<JoinGame/>)} />
                        <Route path="choose" element={protectRoute(<ChooseCards/>)} />
                        <Route path="fight" element={protectRoute(<Fight/>)} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </NotificationProvider>
    </Provider>
);

function protectRoute(element: JSX.Element) {
    return <ProtectedRoute>{element}</ProtectedRoute>;
}
