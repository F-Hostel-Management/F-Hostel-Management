import homeReducer from '../pages/Home/homeSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        home: homeReducer,
    },
})
