import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    lording: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logInStart: (state) => {
            state.lording = true;
            state.error = null;
        },
        logInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.lording = false;
            state.error = null;
        },
        logInFailure: (state, action) => {
            state.error = action.payload;
            state.lording = false;
        },
        updateStart: (state) => {
            state.lording = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.lording = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.lording = false;
        },
        logOutSuccess: (state) => {
            state.currentUser = null;
            state.lording = false;
            state.error = null;
        },
    },
});

export const { logInStart, logInSuccess, logInFailure, updateStart, updateSuccess, updateFailure, logOutSuccess } = userSlice.actions;

export default userSlice.reducer;