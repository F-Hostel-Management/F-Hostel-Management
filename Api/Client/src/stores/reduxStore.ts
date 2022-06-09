import authReducer from '../slices/authSlice'
import hostelReducer from '../slices/hostelSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        hostel: hostelReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
