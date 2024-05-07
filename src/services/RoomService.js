import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getRooms = createAsyncThunk(
    "rooms/getRooms",
    async ()=>{
        const res = await customAxios.get(`rooms`)
        return res.data
    }
)