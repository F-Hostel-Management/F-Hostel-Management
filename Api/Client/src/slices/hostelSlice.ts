import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHostel } from '../interface/IHostel'
import { AppState } from '../stores/reduxStore'

interface IHostelSliceState {
    currentHostel: IHostel
}

const initialState: IHostelSliceState = {
    currentHostel: {},
}

const hostelSlice = createSlice({
    name: 'hostel',
    initialState,
    reducers: {
        setCurrentHostel: (
            state: IHostelSliceState,
            actions: PayloadAction<IHostel>
        ) => {
            state.currentHostel = actions.payload
        },
    },
})

export const { setCurrentHostel } = hostelSlice.actions

export const getCurrentHostel = (state: AppState) => state.hostel.currentHostel

const { reducer } = hostelSlice
export default reducer
