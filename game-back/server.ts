import {Server} from 'socket.io';
import express from 'express';
import {createServer} from 'http';

const { PORT = 3000 } = process.env;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', () => {
    console.log('connected');
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
