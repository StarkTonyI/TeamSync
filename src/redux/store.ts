import { configureStore } from "@reduxjs/toolkit";
import authApi from "./authApi/authApi.js";
import adminApi from "./adminApi/adminApi.js";
import userApi from "./userApi/userApi.js";

import userCommandApi from './userCommandApi/UserCommandApi.js';
import adminCommandApi from './adminCommandApi/AdminCommandApi.js';

import messageStateSlice from '../redux/reduxSlice/messageSlice.js';
import messageApi from "./messageApi/messageApi.js";
import breakTaskSlice from './reduxSlice/breakTaskSlice.js';
import mainTaskSlice from './reduxSlice/mainTaskSlice.js'
import onlineOfflinePeopleReducer from './onlineOfflinePeople/onlineOfflinePeople.js';
import totalTaskApi from "./totalTaskApi/totalTask.js";
import joinSlice from './reduxSlice/joinTeamOrUserSlice.js'
import authSlice  from './reduxSlice/authSlice.js'

export const store = configureStore({
    reducer:{
        breakTask:breakTaskSlice,
        mainTask:mainTaskSlice,
        messages:messageStateSlice,
        join:joinSlice,
        onlineOfflinePeople:onlineOfflinePeopleReducer,
        auth:authSlice.reducer,
        [authApi.reducerPath]:authApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [userCommandApi.reducerPath]:userCommandApi.reducer,
        [adminCommandApi.reducerPath]:adminCommandApi.reducer,
        [userApi.reducerPath]:userApi.reducer,
        [messageApi.reducerPath]:messageApi.reducer,

        [totalTaskApi.reducerPath]:totalTaskApi.reducer
        
    
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            adminApi.middleware,
            adminCommandApi.middleware,
            userCommandApi.middleware, 
            userApi.middleware, 
            messageApi.middleware,
            totalTaskApi.middleware
        )
});
export type AppDispatch = typeof store.dispatch; 