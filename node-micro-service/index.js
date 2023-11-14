const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/users', (req, res) => {
   res.send([{ id: 'bed750ac-22c8-4215-9d2a-d4ab81538924', name: 'John' }, { id: '366d438a-0d22-4bef-b2c2-c1cfd434ac16', name: 'Doe' }, { id: '9d60d123-35e8-4797-9394-99a4d463ddbc', name: 'Jane'}]);
});

app.post('/create-chat-room', (req, res) => {
    // Get users ids ordered
    console.log('BODY', req.body)
    const users = req.body?.users;
    if(!users || users.length !== 2) return;
    console.log(users)
    const ids = users.map(user => user.id).sort();
    const roomId = ids.join('-');
    // return roomId
    res.send({ roomId: roomId });
});

io.on('connection', (socket) => {
    socket.on('join room', (roomId) => {
        socket.join(roomId);
    });

    socket.on('message', (roomId, message, userId) => {
        console.log(userId)
        io.to(roomId).emit('message', message);
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
