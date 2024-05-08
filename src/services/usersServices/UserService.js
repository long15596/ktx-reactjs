import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const login = createAsyncThunk(
    "user/login",
    async (values)=>{
        const res = await customAxios.post('login',values)
        return res.data
    }
)
export const setCheckShow = createAsyncThunk(
    "checkShow/check",
    async (values)=>{
        return values
    }
)
export const logOut = createAsyncThunk(
    "user/logout",
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
        return res.data
    }
)
export const addProfile = createAsyncThunk(
    "user/addProfile",
    async ({values})=>{
        const res = await  customAxios.post(`register`,values)
        return res.data
    }
)
export const getAllUserByAdmin = createAsyncThunk(
    "user/getAllUserByAdmin",
    async ()=>{
        const res = await customAxios.get(`admin/users`)
        return res.data
    }
)
export const changeEnabled = createAsyncThunk(
    "user/changeEnabled",
    async ({id})=>{
         await customAxios.put(`admin/${id}`)
    }
)