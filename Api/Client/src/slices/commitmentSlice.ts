import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICommitment } from '../interface/ICommitment'
import {
    getAllCommitmentOfHostel,
    getNumberCommitmentOfHostel,
} from '../services/CommitmentService'

interface ICommitmentState {
    commitmentList: ICommitment[]
    numOfCommitment: number
    isFetchingCommitments: boolean
}

const initialState: ICommitmentState = {
    commitmentList: [],
    numOfCommitment: 0,
    isFetchingCommitments: true,
}

interface IParams {
    hostelId: string
    pageSize: number
    page: number
}
export const fetchCommitments = createAsyncThunk(
    'commitment/fetchCommitments',
    async (params: IParams) => {
        const { hostelId, pageSize, page } = params
        return {
            commitmentList: await getAllCommitmentOfHostel(
                hostelId,
                pageSize,
                page
            ),
            numOfCommitment: await getNumberCommitmentOfHostel(hostelId),
        }
    }
)

const commitmentSlice = createSlice({
    name: 'commitment',
    initialState,
    reducers: {
        setCommitmentList: (
            state: ICommitmentState,
            action: PayloadAction<ICommitment[]>
        ) => {
            state.commitmentList = action.payload
        },
        setNumOfCommitment: (
            state: ICommitmentState,
            action: PayloadAction<number>
        ) => {
            state.numOfCommitment = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommitments.fulfilled, (state, action) => {
                state.commitmentList = action.payload.commitmentList
                state.numOfCommitment = action.payload.numOfCommitment
                state.isFetchingCommitments = false
            })
            .addCase(fetchCommitments.pending, (state) => {
                state.isFetchingCommitments = true
            })
            .addCase(fetchCommitments.rejected, (state) => {
                state.isFetchingCommitments = false
            })
    },
})

export const { setCommitmentList, setNumOfCommitment } = commitmentSlice.actions

const { reducer } = commitmentSlice
export default reducer
