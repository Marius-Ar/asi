import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Socket} from 'socket.io-client';

interface GameSocketState {
    socket: Socket | null;
}

const initialState: GameSocketState = {
    socket: null
};

const gameSocketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<Socket>) => {
            return { ...state, socket: action.payload };
        },
        clearSocket: (state) => {
            return { ...state, socket: null };
        }
    }
});

export const {setSocket, clearSocket} = gameSocketSlice.actions;
export default gameSocketSlice.reducer;