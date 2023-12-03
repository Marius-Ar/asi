const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server,
    {
        cors: { // Todo : remove this in production
            origin: 'http://localhost:3000',
        },
    });


io.on('connection', (socket) => {
    socket.on('join-chat', (roomId) => {
        socket.join(roomId);
    });

    socket.on('message', (roomId, message, userId) => {
        io.to(roomId).emit('message', {text: message, senderId: userId, timestamp: Date.now()});
    });
});

server.listen(3002, () => {
    console.log('Server is running on port 3002');
});
