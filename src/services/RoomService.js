import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getRooms = createAsyncThunk(
    "rooms/getRooms",
    async () => {
        const res = await customAxios.get(`rooms`)
        return res.data
    }
)
export const addRooms = createAsyncThunk(
    "rooms/addRooms",
    async ({values}) => {
        const res = await customAxios.post(`rooms`, values)
        return res.data
    }
)