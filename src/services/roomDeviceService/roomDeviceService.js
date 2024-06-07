import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";
export const getRoomDevice = createAsyncThunk(
    "roomDevices/getRoomDevice",
    async ({id}) => {
        const res = await customAxios.get(`rooms-device?id=${id}`)
        return res.data
    }
)
export const addRoomDevice = createAsyncThunk(
    "roomDevices/addRoomDevice",
    async ({values}) => {
        const res = await customAxios.post(`rooms-device`, values)
        return res.data
    }
)
export const deleteRoomDevice = createAsyncThunk(
    "roomDevices/deleteRoomDevice",
    async ({id}) => {
        const res = await customAxios.delete(`rooms-device/${id}`)
        return res.data
    }
)