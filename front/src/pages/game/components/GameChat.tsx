import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../../store/store";
import WebSocketGameChat from "../WebSocketGameChat";
import {Header} from "semantic-ui-react";
import ApiUser from "../../../core/api/ApiUser";
import {io} from "socket.io-client";
import {NotificationType} from "../../../core/components/notification/Notification";


interface UserDto {
    id: string;
    name: string;
    // Ajoutez d'autres champs selon la structure de vos données
}


interface Message {
    senderId: string;
    text: string;
    timestamp: string; // ou Date selon votre préférence
}


export function GameChat() {
    const socket = WebSocketGameChat.getInstance();

    const userId: string | null = useSelector((state: AppState) => state.auth.userId);
    const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
    const [roomId, setRoomId] = useState<string>('');
    const [users, setUsers] = useState<UserDto[]>([
        {
            id: 'f552e7f5-66b1-4f78-b439-c4d8cfc74b06',
            name: 'Axel Perraud'
        },
        {
            id: '2855398f-6fc3-4f11-b318-da0668703979',
            name: 'example'
        }
    ]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchUsers = async () => {
            //get request to get users
            //TODO: PROBLEM LIST USER
            //const usersData: UserDto[] = await ApiUser.getUsers();
            //setUsers(usersData);
        };

        fetchUsers();


        socket?.socket?.on('message', (message: Message) => {
            console.log('ASDKJAS', message)
            console.log(messages)
            setMessages(prevMessages => [...prevMessages, message]);
            console.log(messages)
        });

        return () =>{
            socket.disconnect();
        }
    }, [socket]);


    const sendMessage = () => {
        if (!userId || !message.trim()) return; // Vérifiez si le message n'est pas vide
        socket.sendMessage(roomId, message, userId)
        setMessage(""); // Réinitialisez le champ après l'envoi
    };




    const handleSelectUser = (user: UserDto) => {
        setSelectedUser(user);
        console.log('USER', userId)
        console.log('SELECTED USER', user)
        const roomId: string = [userId, user.id].sort().join('-');
        socket.joinRoom(roomId);
        console.log('EKIP', roomId)
        setRoomId(roomId);
    }


    return (
        <div>
            <div className="ui segment">
                <div className="ui top attached label">
                    <div className="ui two column grid">
                        <div className="column">Chat</div>
                        <div className="column">
                            <div className="ui two column grid">
                                <div className="column">{selectedUser?.name}</div>
                                <div className="column"><i className="user circle icon"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <select
                value={selectedUser ? selectedUser.id : ""}
                onChange={(e) => {
                    const user = users.find(user => user.id === e.target.value);
                    if (user) {
                        handleSelectUser(user);
                    }
                }}
                className=" ui fluid dropdown"
            >
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            {roomId && (
                <>
                    <div className="ui segment" style={{minHeight: '45vh'}}>
                        {messages.map((message, index) => (
                            <div key={index} className="ui raised segment">
                                <a className={`ui ribbon label ${message.senderId === userId ? 'green right' : 'blue'}`}>
                                    {message.senderId === userId ? 'Me' : message.senderId}
                                </a>
                                <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="ui form">
                        <div className="field">
                   <textarea
                       id="messageInput"
                       className=""
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       placeholder="Type a message..." // Vous pouvez ajouter un placeholder si vous voulez
                   ></textarea>
                        </div>
                    </div>
                    <button
                        className="fluid ui right labeled icon button"
                        onClick={sendMessage}
                    >
                        <i className="right arrow icon"></i>
                        Send
                    </button>
                </>
            )}
        </div>
    )
}

