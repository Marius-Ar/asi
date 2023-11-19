import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserDetails} from "../core/interfaces/user-detail.interface";

interface UserState {
    userDetails: UserDetails | null;
    isLoaded: boolean;
}

const initialState: UserState = {
    userDetails: null,
    isLoaded: false
};

const userDetailsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<UserDetails>) => {
            state.userDetails = action.payload;
            state.isLoaded = true;
        },
        clearUserDetails: (state) => {
            state.userDetails = null;
            state.isLoaded = false;
        },
        adjustUserBalance: (state, action: PayloadAction<number>) => {
            if (state.userDetails) {
                state.userDetails.balance += action.payload;
            }
        }
    }
});

export const {setUserDetails, clearUserDetails, adjustUserBalance} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
