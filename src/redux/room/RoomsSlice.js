import {createSlice} from "@reduxjs/toolkit";
import {addRooms, getRooms} from "../../services/RoomService";

const initialState = {
    rooms: [],
    newRoom: null
}
const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    extraReducers: builder => {
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.rooms = action.payload
        });
        builder.addCase(addRooms.fulfilled, (state, action) => {
            state.rooms.push(action.payload)
            state.newRoom = action.payload
        })
    }
})
export default roomsSlice.reducer;