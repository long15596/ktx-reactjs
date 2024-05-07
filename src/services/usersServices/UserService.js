import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const login = createAsyncThunk(
    "user/Login",
    async (values)=>{
        const res = await customAxios.post('login',values)
        console.log(res.data)
        return res.data
    }
)
export const setCheckShow = createAsyncThunk(
    "checkShow/Check",
    async (values)=>{
        return values
    }
)
export const logOut = createAsyncThunk(
    "user/Logout",
    async ()=>{
    }
)
export const getProfile = createAsyncThunk(
    "user/getProfile",
    async (id)=>{
        const res = await customAxios.get(`users/${id}`)
        return res.data
    }
)

export const editProfile = createAsyncThunk(
    "user/editProfile",
    async ({id,values})=>{
        const res = await customAxios.put(`users/${id}`,values)
        console.log(res)
        return res.data
    }
)