import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInvoiceSchedule } from '../interface/IInvoice'
import {
    getInvoiceSchedules,
    getNumberOfInvoiceSchedule,
} from '../services/InvoiceScheduleService'

interface IInvoiceScheduleState {
    invoiceScheduleList: IInvoiceSchedule[]
    numOfInvoiceSchedule: number
}
const initialState: IInvoiceScheduleState = {
    invoiceScheduleList: [],
    numOfInvoiceSchedule: 0,
}

const invoiceScheduleSlice = createSlice({
    initialState,
    name: 'invoiceSchedule',
    reducers: {
        setInvoiceScheduleList: (
            state,
            action: PayloadAction<IInvoiceSchedule[]>
        ) => {
            state.invoiceScheduleList = action.payload
        },
        setNumOfInvoiceSchedule: (state, action: PayloadAction<number>) => {
            state.numOfInvoiceSchedule = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvoiceSchedules.fulfilled, (state, action) => {
                state.invoiceScheduleList = action.payload
            })
            .addCase(
                fetchNumberOfInvoiceSchedule.fulfilled,
                (state, action) => {
                    state.numOfInvoiceSchedule = action.payload
                }
            )
    },
})

interface IFetchInvoiceSchedulesParams {
    currentPageSize: number
    currentPage: number
}
export const fetchInvoiceSchedules = createAsyncThunk(
    'invoice/fetchInvoiceSchedules',
    ({ currentPageSize, currentPage }: IFetchInvoiceSchedulesParams) => {
        return getInvoiceSchedules(currentPageSize, currentPage)
    }
)

export const fetchNumberOfInvoiceSchedule = createAsyncThunk(
    'invoice/fetchNumberOfInvoiceSchedule',
    () => {
        return getNumberOfInvoiceSchedule()
    }
)

export const { setInvoiceScheduleList, setNumOfInvoiceSchedule } =
    invoiceScheduleSlice.actions

const { reducer } = invoiceScheduleSlice
export default reducer
