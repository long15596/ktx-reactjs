import {createSlice} from "@reduxjs/toolkit";
import {getAllUserRooms, getUserRoomByUserId} from "../../services/userRoomsService/UserRoomService";

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
        builder.addCase(getAllUserRooms.fulfilled, (state, action) => {
            state.userRooms = action.payload
        })
    }
})
export default userRoomSlice.reducer