import {createSlice} from "@reduxjs/toolkit";
import {addUserRoom, getUserRoom, getUserRoomByUserId} from "../../services/userRoomServices/userRoomService";
import {getAllUserRooms} from "../../services/userRoomsService/userRoomService";

const initialState = {
    userRooms : [],
    userRoomsAll : [],
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
        builder.addCase(getAllUserRooms.fulfilled,(state, action)=>{
            state.userRooms = action.payload
            state.userRoomsAll = action.payload
        })
        builder.addCase(getUserRoom.fulfilled,(state, action)=>{
            state.userRoomsAll = action.payload
        })
    }
})
export default userRoomSlice.reducer