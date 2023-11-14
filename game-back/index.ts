import {Server} from 'socket.io';
import {createServer} from 'http';

const httpServer = createServer();
const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('connected');
});

httpServer.listen(3000, () => {
    console.log(`listening on port ${3000}`);
});