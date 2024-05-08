import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/RoomsSlice";
import deviceReducer from "./device/devicesSlice";
import userReducer from "./user/UserSlice";
import roomDeviceReducer from "./roomDevice/roomDeviceSlice";

export let store = configureStore({
    reducer:{
        rooms: roomReducer,
        devices: deviceReducer,
        user:userReducer,
        roomsDevice: roomDeviceReducer
    },
})