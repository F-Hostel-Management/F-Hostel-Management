import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoom } from '../interface/IRoom'
import { countRoomOfHostel, getAllRoomOfHostel } from '../services/RoomService'

interface IRoomState {
    roomList: IRoom[]
    numOfRooms: number
    isFetchingRooms: boolean
}

const initialState: IRoomState = {
    roomList: [],
    numOfRooms: 0,
    isFetchingRooms: true,
}

export const fetchRoomList = createAsyncThunk(
    'room/fetchRoomList',
    async (params: any) => {
        const { hostelId, pageSize, page } = params
        return {
            roomList: await getAllRoomOfHostel(hostelId, pageSize, page),
            numOfRoom: await countRoomOfHostel(hostelId),
        }
    }
)

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoomList: (state: IRoomState, action: PayloadAction<IRoom[]>) => {
            state.roomList = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomList.fulfilled, (state, action) => {
                state.roomList = action.payload.roomList
                state.numOfRooms = action.payload.numOfRoom
                state.isFetchingRooms = false
            })
            .addCase(fetchRoomList.pending, (state) => {
                state.isFetchingRooms = true
            })
            .addCase(fetchRoomList.rejected, (state) => {
                state.isFetchingRooms = false
            })
    },
})

export const { setRoomList } = roomSlice.actions

const { reducer } = roomSlice
export default reducer
