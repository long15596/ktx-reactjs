import {createSlice} from "@reduxjs/toolkit";
import {addUserRoom, getUserRoom, getUserRoomByUserId} from "../../services/userRoom/userRoomService";

const initialState = {
    userRooms : []
}
const userRoomSlice = createSlice({
    name: 'userRooms',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUserRoomByUserId.fulfilled, (state, action) => {
            state.userRooms = action.payload
        })
        builder.addCase(addUserRoom.fulfilled,(state, action)=>{
            state.userRooms.push(action.payload)
        })
        builder.addCase(getUserRoom.fulfilled,(state, action)=>{
            state.userRooms = action.payload
        })
    }
})
export default userRoomSlice.reducer