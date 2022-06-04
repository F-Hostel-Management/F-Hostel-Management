import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interface/IUser'

interface AuthSliceState {
    isAuthenticated: boolean
    currentUser?: IUser
}

const initialState: AuthSliceState = {
    isAuthenticated: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (
            state: AuthSliceState,
            actions: PayloadAction<IUser>
        ) => {
            state.currentUser = actions.payload
            state.isAuthenticated = true
        },
        setIsAuthenticated: (
            state: AuthSliceState,
            actions: PayloadAction<boolean>
        ) => {
            state.isAuthenticated = actions.payload
        },
    },
})

export const { setCurrentUser, setIsAuthenticated } = authSlice.actions

const { reducer } = authSlice
export default reducer
