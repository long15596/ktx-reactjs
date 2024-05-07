import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/RoomsSlice";
import userReducer from "./user/UserSlice";

export let store = configureStore({
    reducer:{
        rooms: roomReducer,
        user:userReducer
    },
})