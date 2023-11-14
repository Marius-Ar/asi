const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('join room', (roomId) => {
        socket.join(roomId);
    });

    socket.on('message', (roomId, message) => {
        io.to(roomId).emit('message', message);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
