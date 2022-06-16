import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICommitment } from '../interface/ICommitment'
import { getAllCommitmentOfHostel } from '../services/CommitmentService'

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

export const fetchCommitments = createAsyncThunk(
    'commitment/fetchCommitments',
    async (params: any) => {
        const { currentHostelId, pageSize, page } = params
        return await getAllCommitmentOfHostel(currentHostelId, pageSize, page)
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
                state.commitmentList = action.payload
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
