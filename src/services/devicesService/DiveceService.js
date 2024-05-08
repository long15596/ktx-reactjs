import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getDevices = createAsyncThunk(
    'devices/getDevices',
    async () => {
        const res = await customAxios.get(`devices`)
        return res.data
    }
)
export const addDevices = createAsyncThunk(
    'devices/addDevices',
    async ({values}) => {
        const res = await customAxios.post(`devices`, values)
        return res.data
    }
)
export const editDevice = createAsyncThunk(
    'devices/editDevice',
    async ({id, values}) => {
        const res = await customAxios.put(`devices/${id}`, values)
        return res.data
    }
)