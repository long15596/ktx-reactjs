import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getAllUserRooms = createAsyncThunk(
    "rooms/getRooms",
    async () => {
        const res = await customAxios.get(`users-room`)
        return res.data
    }
)