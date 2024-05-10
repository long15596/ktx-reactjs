import {createSlice} from "@reduxjs/toolkit";
import {getUserRoomByUserId} from "../../services/userRoom/userRoomService";

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
    }
})
export default userRoomSlice.reducer