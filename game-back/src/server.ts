import {Server} from 'socket.io';
import express from 'express';
import {createServer} from 'http';
import {onUserJoinRoom} from './business/game-room-logic';
import Room from './business/Room';

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
    let usersRoom: Room | null = null;

    socket.on('join-game', ({userId}) => {
        usersRoom = onUserJoinRoom(userId);
        if (usersRoom !== null) {
            socket.join(usersRoom.id);
            io.to(usersRoom.id).emit('joined', usersRoom.serialize());
        }
    });

    socket.on('get-info-game', () => {
        if (usersRoom !== null) {
            io.to(usersRoom.id).emit('info-game', usersRoom.serialize());
        }
    });

    socket.on('chose', ({userId, cardIds}) => {
        if (usersRoom !== null) {

            // Todo : Room's responsibility
            usersRoom.setPlayerCards(userId, cardIds);
            usersRoom.pickRandomPlayer();
            io.to(usersRoom.id).emit('info-game', usersRoom.serialize());
        }
    });

    socket.on('attack', ({userId, attackingCard, targetCard}) => {
        if (usersRoom !== null) {
            usersRoom.attackPlayer(userId, attackingCard, targetCard);

            const winnerId = usersRoom.getWinner();
            if (winnerId != null) {
                const gain = Math.floor(Math.random() * (100 - 10 + 1) + 10);
                io.to(usersRoom.id).emit('winner', {winnerId, gain});
            }
            io.to(usersRoom.id).emit('info-game', usersRoom.serialize());
        }
    });
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
