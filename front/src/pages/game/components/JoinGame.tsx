import {io} from 'socket.io-client';
import Cookies from 'js-cookie';
import React, {useState} from 'react';
import Room from '../classes/Room';

export function JoinGame() {
    const socket = io('http://localhost:3001');
    const userId = Cookies.get('userId');
    let clickedJoined = false;
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);

    socket.on('joined', ({id, firstPlayerId, secondPlayerId}) => {
        const room = new Room(id, firstPlayerId, secondPlayerId);
        setJoinedRoom(room);
        console.log(room.isFull())
    });

    const joinGame = () => {
        socket.emit('join-game', {userId});
        clickedJoined = true;
    };

    return (
        <div className="ui container">
            <div className="ui center">
                <button className="huge ui primary button"
                        onClick={joinGame}
                        disabled={clickedJoined}
                >Join a game
                </button>
                {joinedRoom !== null && <table>
                    <thead>
                    <tr>
                        <th>Players</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{joinedRoom.firstPlayerId}</td>
                    </tr>
                    {joinedRoom.secondPlayerId &&
                        <tr>
                            <td>{joinedRoom['secondPlayerId']}</td>
                        </tr>
                    }
                    </tbody>
                </table>}
                {joinedRoom !== null && joinedRoom.firstPlayerId && joinedRoom.secondPlayerId &&
                    <p>Game is full!<br/>Starting in 3 seconds</p>}
            </div>
        </div>
    );
}