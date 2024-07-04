import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    title: "The JourNULL",
    userID: "Doesn't Exist!"
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userUpdate: (state, action) => {
            state.title = action.payload + "'s JourNULL";
        },
        userIDUpdate: (state, action) => {
            state.userID = action.payload;
        }
    }
});

export const {userUpdate, userIDUpdate} = userSlice.actions;

export default userSlice.reducer;