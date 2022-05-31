import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
})

const { reducer } = homeSlice
export default reducer
