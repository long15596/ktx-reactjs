import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/RoomsSlice";
import deviceReducer from "./device/devicesSlice";
import userReducer from "./user/UserSlice";
import invoiceReducer from "./invoice/InvoicesSlice";
import roomDeviceReducer from "./roomDevice/roomDeviceSlice";

export let store = configureStore({
    reducer:{
        invoices: invoiceReducer,
        rooms: roomReducer,
        devices: deviceReducer,
        user:userReducer,
        roomsDevice: roomDeviceReducer
    },
})