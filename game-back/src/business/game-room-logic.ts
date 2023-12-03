import Room from './Room';
import {Player} from './Player';

var rooms: Room[] = [];

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
        rooms[availableRoomIndex].secondPlayer = new Player(userId);
        joinedRoom = rooms[availableRoomIndex];
    } else {
        joinedRoom = createRoom(userId);
    }

    return joinedRoom;
}

function getUsersAssignedRoom(userId: string): Room | undefined {
    return rooms.find(room => room.containsUser(userId));
}

function getFirstAvailableRoomIndex(): number {
    return rooms.findIndex(room => !room.isFull());
}

function createRoom(firstPlayerId: string): Room {
    const newRoom = new Room(firstPlayerId);
    rooms.push(newRoom);
    return newRoom;
}

export function removeRoom(roomId:string){
    rooms = rooms.filter(room => room.id !== roomId);
}
