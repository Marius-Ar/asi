import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/semantic-ui-css/semantic.min.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);