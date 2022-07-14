import { IManagement } from './../interface/IManager'
import { AppState } from './../stores/reduxStore'
import { IGridValue } from './../interface/IGridValue'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getHostelAssignmentList } from '../services/HostelManagementService'
interface ManagerState {
    gridData: IGridValue<IManagement>
}
const initialState: ManagerState = {
    gridData: {
        rows: [
            {
                hostelId: 'null',
                manager: {
                    name: 'Bui Ngoc Huy',
                    phone: '0937046839',
                    id: '1',
                    avatar: '',
                    email: '',
                },
                id: '1',
            },
        ],
        totalRows: 0,
        loading: true,
    },
}
const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHostelAssignmentList.fulfilled, (state, action) => {
                state.gridData.loading = false
                state.gridData.rows = action.payload
            })
            .addCase(fetchHostelAssignmentList.pending, (state, action) => {
                state.gridData.loading = false
            })
            .addCase(fetchHostelAssignmentList.rejected, (state, action) => {
                state.gridData.loading = false
            })
    },
})

// export const {} = managerSlice.actions
export const getGridData = (state: AppState) => state.manager.gridData
interface IFetchParams {
    currentPageSize: number
    currentPage: number
}
export const fetchHostelAssignmentList = createAsyncThunk(
    'manager/fetchManager',
    ({ currentPageSize, currentPage }: IFetchParams) => {
        return getHostelAssignmentList(currentPageSize, currentPage)
    }
)
export default managerSlice.reducer
