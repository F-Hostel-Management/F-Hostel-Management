import authReducer from '../slices/authSlice'
import tableReducer from '../slices/tableSlice'
import hostelReducer from '../slices/hostelSlice'
import commitmentReducer from '../slices/commitmentSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        table: tableReducer,
        hostel: hostelReducer,
        commitment: commitmentReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
