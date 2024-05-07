import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/RoomsSlice";
import deviceReducer from "./divice/devicesSlice";

export let store = configureStore({
    reducer:{
        rooms: roomReducer,
        devices: deviceReducer,
    },
})