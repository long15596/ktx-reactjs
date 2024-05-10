import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getUserRoomByUserId = createAsyncThunk(
    "userRooms/getUserRoomById",
    async ({id}) => {
        const res = await customAxios.get(`users-room/user/${id}`)
        return res.data
    }
)