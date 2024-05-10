import {createSlice} from "@reduxjs/toolkit";
import {getAllUserRooms} from "../../services/userRoomsService/userRoomService";


const initialState = {
  userRooms:[]
}
const userRoomSlice = createSlice({
    name: 'userRooms',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllUserRooms.fulfilled, (state, action) => {
                state.userRooms = action.payload
            }
        )
    }
});
export default userRoomSlice.reducer;