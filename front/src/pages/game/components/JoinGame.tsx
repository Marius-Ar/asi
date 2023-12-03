import {io} from 'socket.io-client';
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';
import Room from '../classes/Room';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setSocket} from '../../../store/gameSocketReducer';
import {Player} from '../classes/Player';

export function JoinGame() {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);

    const START_DELAY = 3000;

    const socket = useSelector((state: any) => state.socket.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) {
            const newSocket = io('http://localhost:3001');
            dispatch(setSocket(newSocket));
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('joined', ({id, firstPlayer, secondPlayer}: {id: string, firstPlayer: Player, secondPlayer: Player | null}) => {
                const room = new Room(id, firstPlayer, secondPlayer, null);
                setJoinedRoom(room);
                if (room.isFull()) {
                    setTimeout(() => {
                        navigate('/game/choose');
                    }, START_DELAY);
                }
            });
        }
    }, [socket]);

    const joinGame = () => {
        socket.emit('join-game', {userId});
    };

    return (
        <div className="ui container">
            <div className="ui center">
                <button className="huge ui primary button"
                        onClick={joinGame}
                        disabled={!!joinedRoom}
                >Join a game
                </button>
                {joinedRoom && joinedRoom.firstPlayer && <table>
                    <thead>
                    <tr>
                        <th>Players</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{joinedRoom.firstPlayer.id}</td>
                    </tr>
                    {joinedRoom.secondPlayer &&
                        <tr>
                            <td>{joinedRoom.secondPlayer.id}</td>
                        </tr>
                    }
                    </tbody>
                </table>}
                {joinedRoom && joinedRoom.firstPlayer && joinedRoom.secondPlayer &&
                    <p>Game is full!<br/>Starting in {START_DELAY / 1000} seconds</p>}
            </div>
        </div>
    );
}