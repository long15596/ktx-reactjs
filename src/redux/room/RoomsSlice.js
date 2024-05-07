import {createSlice} from "@reduxjs/toolkit";
import {getRooms} from "../../services/RoomService";

const initialState = {
    rooms : []
}
const roomsSlice = createSlice({
    name : 'rooms',
    initialState,
    extraReducers: builder => {
        builder.addCase(getRooms.fulfilled, (state, action)=>{
            state.rooms = action.payload
        })
    }
})
export default roomsSlice.reducer;