import {Server} from 'socket.io';
import express from 'express';
import {createServer} from 'http';
import {onUserJoinRoom} from './business/game-room-logic';

const {PORT = 3001} = process.env;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

io.on('connection', socket => {
    socket.on('join-game', ({userId}) => {
        const usersRoom = onUserJoinRoom(userId);
        const roomId = usersRoom.id;
        socket.join(roomId);
        socket.to(roomId).emit('joined', usersRoom);
    });
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
