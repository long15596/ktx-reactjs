import {createSlice} from "@reduxjs/toolkit";
import {addRooms, editRooms, getOneRoom, getRooms} from "../../services/roomsServices/RoomService";


const initialState = {
    rooms: [],
    room:{},
    newRoom: {}
}
const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    extraReducers: builder => {
        builder.addCase(getRooms.fulfilled, (state, action) => {
            state.rooms = action.payload
        });
        builder.addCase(getOneRoom.fulfilled, (state, action)=>{
            state.room = action.payload
        })
        builder.addCase(addRooms.fulfilled, (state, action) => {
            state.rooms.push(action.payload)
            state.newRoom = action.payload
        })
        builder.addCase(editRooms.fulfilled, (state, action) => {
            let index = state.rooms.findIndex(room => room.id == action.payload.id)
            if (index != -1) state.rooms[index] = action.payload
            state.newRoom = {}
        })

    }
})
export default roomsSlice.reducer;