import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "./room/RoomsSlice";
import deviceReducer from "./divice/devicesSlice";
import userReducer from "./user/UserSlice";
import invoiceReducer from "./invoice/InvoicesSlice";

export let store = configureStore({
    reducer:{
        invoices: invoiceReducer,
        rooms: roomReducer,
        devices: deviceReducer,
        user:userReducer
    },
})