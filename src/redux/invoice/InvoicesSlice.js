import {createSlice} from "@reduxjs/toolkit";
import {addInvoice, getInvoice} from "../../services/invoicesService/InvoiceService";


const initialState = {
  invoices : []
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
    }
})
export default invoicesSlice.reducer;