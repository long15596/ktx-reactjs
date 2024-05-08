import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const addRoomDevice = createAsyncThunk(
    "roomDevices/addRoomDevice",
    async ({values}) => {
        const res = await customAxios.post(`room-devices`, values)
        return res.data
    }
)