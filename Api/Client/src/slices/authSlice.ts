import { RestCaller } from './../utils/RestCaller'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../interface/IUser'
import moment from 'moment'

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
            state.currentUser.dateOfBirth = moment(
                state.currentUser.dateOfBirth
            ).format('YYYY-MM-DD')
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
const { reducer } = authSlice
export default reducer
