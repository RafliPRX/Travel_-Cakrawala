import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isLoggedIn: !!localStorage.getItem('userInfo'),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
            localStorage.removeItem('userInfo');
        },
    },
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
