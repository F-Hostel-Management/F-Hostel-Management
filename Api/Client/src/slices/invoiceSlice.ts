import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInvoice } from '../interface/IInvoice'
import { getInvoices, getNumberOfInvoice } from '../services/InvoiceService'

interface IInvoiceState {
    invoiceList: IInvoice[]
    numOfInvoice: number
}

const initialState: IInvoiceState = {
    invoiceList: [],
    numOfInvoice: 0,
}

const invoiceSlice = createSlice({
    initialState,
    name: 'invoice',
    reducers: {
        setInvoiceList: (state, action: PayloadAction<IInvoice[]>) => {
            state.invoiceList = action.payload
        },
        setNumOfInvoice: (state, action: PayloadAction<number>) => {
            state.numOfInvoice = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.invoiceList = action.payload
            })
            .addCase(fetchNumberOfInvoice.fulfilled, (state, action) => {
                state.numOfInvoice = action.payload
            })
    },
})

interface IFetchInvoicesParams {
    currentPageSize: number
    currentPage: number
}
export const fetchInvoices = createAsyncThunk(
    'invoice/fetchInvoices',
    ({ currentPageSize, currentPage }: IFetchInvoicesParams) => {
        return getInvoices(currentPageSize, currentPage)
    }
)

export const fetchNumberOfInvoice = createAsyncThunk(
    'invoice/fetchNumberOfInvoice',
    () => {
        return getNumberOfInvoice()
    }
)

export const { setInvoiceList, setNumOfInvoice } = invoiceSlice.actions

const { reducer } = invoiceSlice
export default reducer
