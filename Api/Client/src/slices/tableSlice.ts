import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITableState {
    page: number
    pageSize: number
}
const initialState: ITableState = {
    page: 0,
    pageSize: 25,
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setPage: (state: ITableState, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setPageSize: (state: ITableState, action: PayloadAction<number>) => {
            state.pageSize = action.payload
        },
        setTableInitialState: (state: ITableState) => {
            state.page = initialState.page
            state.pageSize = initialState.pageSize
        },
    },
})

export const { setPage, setPageSize, setTableInitialState } = tableSlice.actions

const { reducer } = tableSlice
export default reducer
