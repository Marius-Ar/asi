import {v4 as uuidv4} from 'uuid';
import Room from './Room';

const rooms: Room[] = [];

export function onUserJoinRoom(userId: string) {
    const usersAssignedRoom = getUsersAssignedRoom(userId);
    if (usersAssignedRoom) {
        return usersAssignedRoom;
    }

    const joinedRoom = makeUserJoinOrCreateRoom(userId);
    if (joinedRoom.isFull()) {
        // Start game
        console.log(`Room ${joinedRoom.id} should start`);
    }
    return joinedRoom;
}

function makeUserJoinOrCreateRoom(userId: string): Room {
    let joinedRoom: Room;
    const availableRoomIndex = getFirstAvailableRoomIndex();
    if (availableRoomIndex !== -1) {
        rooms[availableRoomIndex].secondPlayerId = userId;
        joinedRoom = rooms[availableRoomIndex];
    } else {
        joinedRoom = createRoom(userId);
    }

    return joinedRoom;
}

function getUsersAssignedRoom(userId: string): Room {
    return rooms.find(room => room.containsUser(userId));
}

function getFirstAvailableRoomIndex(): number {
    return rooms.findIndex(room => !room.isFull());
}

function createRoom(userId: string): Room {
    const newRoom = new Room(uuidv4(), userId);
    rooms.push(newRoom);
    return newRoom;
}
