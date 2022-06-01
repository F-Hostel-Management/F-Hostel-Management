import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthSliceState {
    token: string
}

const initialState: AuthSliceState = {
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state: AuthSliceState, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    },
})

export const { setToken } = authSlice.actions

const { reducer } = authSlice
export default reducer
