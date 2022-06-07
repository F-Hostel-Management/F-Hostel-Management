import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { IUser } from '../interface/IUser'

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
            state.currentUser.dateOfBirth = moment(
                state.currentUser.dateOfBirth
            ).format('YYYY-MM-DD')
            state.isAuthenticated = true
        },
    },
})

export const { setCurrentUser } = authSlice.actions

const { reducer } = authSlice
export default reducer
