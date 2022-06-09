import authReducer from '../slices/authSlice'
import tableReducer from '../slices/tableSlice'
import commitmentReducer from '../slices/commitmentSlice'
import homeReducer from '../slices/homeSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        table: tableReducer,
        home: homeReducer,
        commitment: commitmentReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
