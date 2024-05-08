import {createSlice} from "@reduxjs/toolkit";
import {addRoomDevice, getRoomDevice} from "../../services/roomDeviceService/roomDeviceService";

const initialState = {
    roomDevices: [],
}
const roomDevicesSlice = createSlice({
    name: 'roomDevices',
    initialState,
    extraReducers: builder => {
        builder.addCase(getRoomDevice.fulfilled, (state, action) => {
            state.roomDevices = action.payload
        })
        builder.addCase(addRoomDevice.fulfilled, (state, action) => {
            state.roomDevices.push(action.payload)
        })
    }
})
export default roomDevicesSlice.reducer