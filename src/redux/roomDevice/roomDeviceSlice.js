import {createSlice} from "@reduxjs/toolkit";
import {addRoomDevice} from "../../services/roomDeviceService/roomDeviceService";

const initialState = {
    roomDevices: [],
}
const roomDevicesSlice = createSlice({
    name: 'roomDevices',
    initialState,
    extraReducers: builder => {
        builder.addCase(addRoomDevice.fulfilled, (state, action) => {
            state.roomDevices.push(action.payload)
        })
    }
})