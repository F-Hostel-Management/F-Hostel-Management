import authReducer from '../slices/authSlice'
import hostelReducer from '../slices/hostelSlice'
import facilityReducer from '../slices/facilitySlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        hostel: hostelReducer,
        facility: facilityReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
