import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getInvoice = createAsyncThunk(
    "invoice/getInvoice",
    async () => {
        const res = await customAxios.get(`/invoices`)
        return res.data
    }
)
export const addInvoice = createAsyncThunk(
    "invoice/addInvoice",
    async ({value}) => {
        const res = await customAxios.post(`/invoices`,value)
       return res.data
    }
)