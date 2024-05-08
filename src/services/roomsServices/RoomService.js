import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getRooms = createAsyncThunk(
    "rooms/getRooms",
    async () => {
        const res = await customAxios.get(`rooms`)
        return res.data
    }
)
export const getOneRoom = createAsyncThunk(
    "rooms/getOneRoom",
    async (id) => {
        const res = await customAxios.get(`rooms/${id}`)
        console.log(res)
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
export const editRooms = createAsyncThunk(
    "rooms/editRooms",
    async ({id, values}) => {
        const res = await customAxios.put(`rooms/${id}`, values)
        return res.data
    }
)