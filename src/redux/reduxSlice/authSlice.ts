import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../../features/getBaseUrl";

const initialState = {
    accessToken: null,
    user: null, 
    role:''
};


export const initAuth = createAsyncThunk('auth/initAuth', async (_, { dispatch }) => {
    try {
        const response = await axios.post(`${getBaseUrl()}/api/auth/refresh`, {}, { withCredentials: true });
        dispatch(authSlice.actions.setToken(response.data.accessToken));
    } catch (error) {
        dispatch(authSlice.actions.logout());
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
        },
        setAuthRole:(state, action) => { 
            state.role = action.payload;
        }
    }
});



export default authSlice;
export const { setToken, logout, setAuthRole } = authSlice.actions;
