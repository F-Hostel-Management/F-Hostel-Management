import authReducer from '../slices/authSlice'
import tenantReducer from '../slices/tenantSlide'
import tableReducer from '../slices/tableSlice'
import commitmentReducer from '../slices/commitmentSlice'
import homeReducer from '../slices/homeSlice'
import roomReducer from '../slices/roomSlice'
import facilityReducer from '../slices/facilitySlice'
import invoiceReducer from '../slices/invoiceSlice'
import invoiceScheduleReducer from '../slices/invoiceScheduleSlice'
import roomDetailsReducer from '../slices/roomDetailsSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tenant: tenantReducer,
        table: tableReducer,
        home: homeReducer,
        room: roomReducer,
        roomDetails: roomDetailsReducer,
        commitment: commitmentReducer,
        facility: facilityReducer,
        invoice: invoiceReducer,
        invoiceSchedule: invoiceScheduleReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
