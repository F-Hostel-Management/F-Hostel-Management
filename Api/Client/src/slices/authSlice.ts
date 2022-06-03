import { createSlice } from '@reduxjs/toolkit'

interface AuthSliceState {
    isAuthenticated: boolean
}

const initialState: AuthSliceState = {
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export const {} = authSlice.actions

const { reducer } = authSlice
export default reducer
