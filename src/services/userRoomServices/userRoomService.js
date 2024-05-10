import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getUserRoomByUserId = createAsyncThunk(
    "userRooms/getUserRoomById",
    async ({id}) => {
        const res = await customAxios.get(`users-room/user/${id}`)
        console.log(res.data)
        return res.data
    })
export const getUserRoom = createAsyncThunk(
    "userRooms/getUserRoom",
    async () => {
        const res = await customAxios.get(`users-room`)
        console.log(res.data)
        return res.data
    })
export const addUserRoom = createAsyncThunk(
    "userRooms/addUserRoom",
    async ({values}) => {
        const res = await customAxios.post(`users-room`, values)
        console.log(res.data)
        return res.data
    })