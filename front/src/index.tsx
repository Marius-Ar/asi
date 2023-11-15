import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/semantic-ui-css/semantic.min.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import routes from './routes';
import {NotificationProvider} from './core/components/notification/NotificationContext';
import {Provider} from "react-redux";
import store from "./store/store";
import {Header} from "./core/components/header/Header"

const router = createBrowserRouter(routes);

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <Provider store={store}>
                <NotificationProvider>
                    <Header/>
                    <RouterProvider router={router}/>
                </NotificationProvider>
        </Provider>
    </React.StrictMode>
);
