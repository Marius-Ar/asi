import {io} from 'socket.io-client';
import Cookies from 'js-cookie';
import React, {useEffect, useState} from 'react';
import Room from '../classes/Room';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearSocket, setSocket} from '../../../store/gameSocketReducer';
import {Player} from '../classes/Player';
import {log} from 'util';

export function JoinGame() {
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const [clickedJoined, setClickedJoined] = useState(false);
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);

    const START_DELAY = 3000;

    const socket = useSelector((state: any) => state.socket.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) {
            const newSocket = io('http://localhost:3001');
            dispatch(setSocket(newSocket));
        }
    }, [socket, dispatch]);

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

    const t = (a: any, b: any) => {
        console.log(a, b)
        return 't'
    }


    const joinGame = () => {
        socket.emit('join-game', {userId});
        setClickedJoined(true);
    };

    return (
        <div className="ui container">
            <div className="ui center">
                <button className="huge ui primary button"
                        onClick={joinGame}
                        disabled={clickedJoined}
                >Join a game
                </button>
                {joinedRoom && joinedRoom.firstPlayer !== null && <table>
                    <thead>
                    <tr>
                        <th>Players</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{joinedRoom.firstPlayer?.id}</td>
                    </tr>
                    {joinedRoom.secondPlayer !== null && joinedRoom.secondPlayer.id &&
                        <tr>
                            <td>{joinedRoom.secondPlayer.id}</td>
                        </tr>
                    }
                    </tbody>
                </table>}
                {joinedRoom !== null && joinedRoom.firstPlayer.id && joinedRoom.secondPlayer?.id &&
                    <p>Game is full!<br/>Starting in {START_DELAY / 1000} seconds</p>}
            </div>
        </div>
    );
}