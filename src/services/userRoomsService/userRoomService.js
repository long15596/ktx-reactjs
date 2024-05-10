import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getAllUserRooms = createAsyncThunk(
    "rooms/getRooms",
    async () => {
        const res = await customAxios.get(`users-room`)
        console.log(res.data)
        return res.data
    }
)
export const getUserRoomByUserId = createAsyncThunk(
    "userRooms/getUserRoomById",
    async ({id}) => {
        const res = await customAxios.get(`/users-room/user/${id}`)
        return res.data
    }
)