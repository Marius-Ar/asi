import {Server} from 'socket.io';
import express from 'express';
import {createServer} from 'http';
import {onUserJoinRoom,removeRoom} from './business/game-room-logic';

const {PORT = 3001} = process.env;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { // Todo : remove this in production
        origin: 'http://localhost:3000',
    },
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('join-game', ({userId}) => {
        const usersRoom = onUserJoinRoom(userId);
        const roomId = usersRoom.id;
        socket.join(roomId);
        console.log(usersRoom.toJsonObject())
        io.to(roomId).emit('joined', usersRoom.toJsonObject());
    });
    socket.on('get-info-game', ({userId}) => {
        const usersRoom = onUserJoinRoom(userId);
        const roomId = usersRoom.id;
        socket.join(roomId);
        console.log(usersRoom.toJsonObject())
        io.to(roomId).emit('info-game', usersRoom.toJsonObject());
    });
    socket.on('chose', ({userId,username, cardIds}) => {
        const usersRoom = onUserJoinRoom(userId);
        usersRoom.setPlayerCards(userId,cardIds);
        usersRoom.setUsername(userId,username);
        const roomId = usersRoom.id;
        socket.join(roomId);
        usersRoom.setplayerTurn();
        io.to(roomId).emit('info-game',usersRoom.toJsonObject());
    });
    socket.on('attack', ({userId, cardUser1,cardUser2}) => {
        const usersRoom = onUserJoinRoom(userId);
        usersRoom.attackPlayer(userId,cardUser1,cardUser2);

        const roomId = usersRoom.id;
        socket.join(roomId);
        var winnerId =usersRoom.checkWinner();
        if(winnerId != null){
            const gain = Math.floor(Math.random() * (100 - 10 + 1) + 10);
            removeRoom(roomId);
            io.to(roomId).emit('winner',{winnerId,gain});
            io.to(roomId).emit('info-game',usersRoom.toJsonObject());
        }else{
            io.to(roomId).emit('info-game',usersRoom.toJsonObject());
        }
    });

    //// CHAT
    socket.on('join-chat', ({userId}) => {
        const usersRoom = onUserJoinRoom(userId);
        const roomId = usersRoom.id;
        socket.join(roomId);
        io.to(roomId).emit('joined', usersRoom.toJsonObject());
    });

    socket.on('message', (roomId, message, userId) => {
        console.log(roomId, message)
        io.to(roomId).emit('message', message, userId);
    });
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
