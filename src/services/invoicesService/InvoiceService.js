import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "../api";

export const getInvoice = createAsyncThunk(
    "invoice/getInvoice",
    async () => {
        const res = await customAxios.get(`/invoices`)
        return res.data
    }
)