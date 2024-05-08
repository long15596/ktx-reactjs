import {createSlice} from "@reduxjs/toolkit";
import {addDevices, editDevice, getDevices} from "../../services/devicesService/DiveceService";

const initialState = {
    devices : []
}
const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    extraReducers: builder => {
        builder.addCase(getDevices.fulfilled, (state, action) => {
            state.devices = action.payload
        })
        builder.addCase(addDevices.fulfilled, (state, action) => {
            state.devices.push(action.payload)
        })
        builder.addCase(editDevice.fulfilled, (state, action) => {
            let index = state.devices.findIndex(device => device.id == action.payload.id)
            if (index != -1) state.devices[index] = action.payload
        })
    }
})
export default devicesSlice.reducer