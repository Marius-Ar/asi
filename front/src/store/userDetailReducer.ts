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

const userDetails = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state: any, action: PayloadAction<UserDetails>) => {
            state.userDetails = action.payload;
            state.isLoaded = true;
        },
        clearUserDetails: (state: any) => {
            state.userDetails = null;
            state.isLoaded = false;
        }
    }
});

export const {setUserDetails, clearUserDetails} = userDetails.actions;
export default userDetails.reducer;