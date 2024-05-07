import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/RoomsSlice";

export let store = configureStore({
    reducer:{
        rooms: roomReducer
    },
})