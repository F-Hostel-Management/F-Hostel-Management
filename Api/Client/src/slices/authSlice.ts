import { RestCaller } from './../utils/RestCaller'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interface/IUser'
import { AppState } from '../stores/reduxStore'

interface AuthSliceState {
    isAuthenticated: boolean
    currentUser?: IUser
}

const initialState: AuthSliceState = {
    isAuthenticated: false,
}
export const logOut = createAsyncThunk('auth/logout', async () => {
    return await RestCaller.post('/authentication/log-out')
})
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
    extraReducers: (builder) => {
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.isAuthenticated = false
            state.currentUser = undefined
        })
    },
})

export const { setCurrentUser } = authSlice.actions
<<<<<<< HEAD
export const getUserRole = (state: AppState) => state.auth.currentUser?.role
export const getCurrentUser = (state: AppState) => state.auth.currentUser

=======
>>>>>>> 47c05557522f5afee1a252d1c17c6b3d1788f0fc
const { reducer } = authSlice
export default reducer
