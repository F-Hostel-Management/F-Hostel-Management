import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interface/IUser'
import { AppState } from '../stores/reduxStore'

interface AuthSliceState {
    isAuthenticated: boolean
    currentUser?: IUser
}

const initialState: AuthSliceState = {
    isAuthenticated: false,
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
    },
})

export const { setCurrentUser } = authSlice.actions
export const getUserRole = (state: AppState) => state.auth.currentUser?.role
export const getCurrentUser = (state: AppState) => state.auth.currentUser

const { reducer } = authSlice
export default reducer
