import { Socket, io } from 'socket.io-client';


class WebSocketGameChat {
    private static instance: WebSocketGameChat | null = null;
    public socket: Socket | null = null;


    private constructor() {
        this.connect('http://localhost:3002'); // Remplacez par l'URL réelle de votre serveur WebSocket
    }


    public static getInstance(): WebSocketGameChat {
        if (!WebSocketGameChat.instance) {
            WebSocketGameChat.instance = new WebSocketGameChat();
        }
        return WebSocketGameChat.instance;
    }


    private connect(url: string): void {
        if (!this.socket) {
            this.socket = io(url);


            this.socket.on('connect', () => {
            });
        }
    }


    public joinRoom(roomId: string): void {
        if (this.socket) {
            this.socket.emit('join-chat', roomId);
        }
    }


    public sendMessage(roomId: string, message: string, userId: string): void {
        if (this.socket) {
            this.socket.emit('message', roomId, message, userId);
        }
    }


    // Vous pouvez ajouter d'autres méthodes pour gérer d'autres événements


    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}


export default WebSocketGameChat;



