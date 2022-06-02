import homeReducer from '../pages/Home/homeSlice'
import authReducer from '../slices/authSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        home: homeReducer,
        auth: authReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
