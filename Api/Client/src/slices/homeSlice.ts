import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHostel } from '../interface/IHostel'
import { IRoom } from '../interface/IRoom'
import { getListHostel } from '../services/HostelService'
import { getAllRoomOfTenant } from '../services/RoomService'
import { AppState } from '../stores/reduxStore'

interface IHomeSliceState {
    currentHostel: IHostel
    hostelList: IHostel[]
    currentRoom: IRoom
    roomList: IRoom[]
}

const initialState: IHomeSliceState = {
    currentHostel: {},
    hostelList: [],
    currentRoom: {},
    roomList: [],
}

export const fetchHostelList = createAsyncThunk(
    'home/fetchHostelList',
    async () => {
        return await getListHostel()
    }
)

export const fetchRoomList = createAsyncThunk(
    'home/fetchRoomList',
    async () => {
        return await getAllRoomOfTenant()
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setCurrentHostel: (
            state: IHomeSliceState,
            actions: PayloadAction<IHostel>
        ) => {
            state.currentHostel = actions.payload
        },
        setCurrentRoom: (
            state: IHomeSliceState,
            actions: PayloadAction<IRoom>
        ) => {
            state.currentRoom = actions.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHostelList.fulfilled, (state, action) => {
                state.hostelList = action.payload
            })
            .addCase(fetchRoomList.fulfilled, (state, action) => {
                state.roomList = action.payload
            })
    },
})

export const { setCurrentHostel } = homeSlice.actions

export const getCurrentHostel = (state: AppState) => state.home.currentHostel

const { reducer } = homeSlice
export default reducer
