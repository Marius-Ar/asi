import {JoinGame} from './components/JoinGame';
import ProtectedRoute from '../../core/components/protected-route/ProtectedRoute';

const gameRoutes = {
    path: "/game",
    children: [
        {
            path: "/game/join",
            element: (
                <ProtectedRoute>
                    <JoinGame/>
                </ProtectedRoute>
            ),
        }
    ]
}

export default gameRoutes;