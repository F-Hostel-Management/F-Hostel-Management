import { AppState } from './../stores/reduxStore'
import { IGridValue } from './../interface/IGridValue'
import { createSlice } from '@reduxjs/toolkit'
import { IManager } from '../interface/IManager'
interface ManagerState {
    gridData: IGridValue<IManager>
}
const initialState: ManagerState = {
    gridData: {
        rows: [
            {
                name: 'Bui Ngoc Huy',
                phone: '0937046839',
                id: '1',
                avatar: '',
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
})

export const {} = managerSlice.actions
export const getGridData = (state: AppState) => state.manager.gridData

export default managerSlice.reducer
