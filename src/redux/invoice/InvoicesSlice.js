import {createSlice} from "@reduxjs/toolkit";
import {addInvoice, getInvoice, getTotalByMonth} from "../../services/invoicesService/InvoiceService";


const initialState = {
    invoices: [],
    totalByMonth: []
}
const invoicesSlice = createSlice({
    name: 'rooms',
    initialState,
    extraReducers: builder => {
        builder.addCase(getInvoice.fulfilled, (state, action) => {
            state.invoices = action.payload
        });
        builder.addCase(addInvoice.fulfilled, (state, action) => {
            state.invoices.push(action.payload)
        });
        builder.addCase(getTotalByMonth.fulfilled, (state, action) => {
            state.totalByMonth = action.payload
        });
    }
})
export default invoicesSlice.reducer;