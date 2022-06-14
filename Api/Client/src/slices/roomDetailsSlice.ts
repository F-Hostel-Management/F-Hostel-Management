import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoom } from '../interface/IRoom'
import { getRoomById } from '../services/RoomService'

interface IRoomDetailsState {
    roomDetails: IRoom
}

const initialState: IRoomDetailsState = {
    roomDetails: {},
}

export const fetchRoomDetails = createAsyncThunk(
    'roomDetails/fetchRoomDetails',
    async (roomId: string) => {
        const result = await getRoomById(roomId)
        return result
    }
)

const roomDetailsSlice = createSlice({
    name: 'roomDetail',
    initialState,
    reducers: {
        setRoomList: (
            state: IRoomDetailsState,
            action: PayloadAction<IRoom>
        ) => {
            state.roomDetails = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoomDetails.fulfilled, (state, action) => {
            state.roomDetails = action.payload
        })
    },
})

export const { setRoomList } = roomDetailsSlice.actions

const { reducer } = roomDetailsSlice
export default reducer
