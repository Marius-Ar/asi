import {io} from 'socket.io-client';
import Cookies from 'js-cookie';

export function JoinGame() {
    const socket = io('http://localhost:3001');
    const userId = Cookies.get('userId');

    socket.on('joined', usersRoom => {
        console.log(usersRoom);
    });

    const joinGame = () => {
        socket.emit('join-game', {userId})
    };

    return (
        <div>
            <button onClick={joinGame}>Join a game</button>
        </div>
    );
}