import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    curruntUser: null,
    error:null,
    lording:false
}

const userSlice = createSlice({
    name   : 'user',
    initialState,
    reducers: {
        logInStart: (state) => {
            state.lording = true;
            state.error = null;
        },
        logInSuccess: (state, action) => {
            state.curruntUser = action.payload;
            state.lording = false;
            state.error = null;
        },
        logInFailure: (state, action) => {
            state.error = action.payload;
            state.lording = false;
        },
    },
});

export const { logInStart, logInSuccess, logInFailure } = userSlice.actions;

export default userSlice.reducer;