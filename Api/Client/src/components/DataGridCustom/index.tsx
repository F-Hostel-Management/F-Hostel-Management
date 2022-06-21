import React, { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { setPage, setPageSize } from '../../slices/tableSlice'

import CustomNoRowsOverlay from './Custom/CustomNoRowsOverlay'
import CustomPagination from './Custom/CustomPagination'
import CustomToolbar from './Custom/CustomToolbar'
import * as Styled from './styles'

interface IDataGridCustomProps<T> {
    loading: boolean
    title: string
    rows: T[]
    columns: Array<any>
    rowsCount: number
    rowsPerPageOptions?: number[]
    toolbarChildren?: ReactNode
}

const DataGridCustom = <T extends Record<string, any>>({
    loading,
    title,
    rows,
    columns,
    // pageSize,
    // setPageSize,
    // page,
    // setPage,
    rowsCount,
    rowsPerPageOptions = [5, 10, 25, 100],
    toolbarChildren,
}: IDataGridCustomProps<T>) => {
    const Toolbar = () => (
        <CustomToolbar title={title}>{toolbarChildren}</CustomToolbar>
    )
    const Pagination = () => (
        <CustomPagination
            rowsPerPageOptions={rowsPerPageOptions}
            pageSize={pageSize}
            setPageSize={setPageSize}
        />
    )
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    return (
        <Styled.DataGridContainer
            width="100%"
            color="#F06D06"
            elevation={3}
            style={{ backgroundColor: '#FFFFFF' }}
        >
            <Styled.DataGrid
                aria-label="Table"
                loading={loading}
                rows={rows}
                columns={columns}
                // server pagination
                pagination
                paginationMode="server"
                onPageChange={(newPage) => dispatch(setPage(newPage))}
                onPageSizeChange={(newPageSize) =>
                    dispatch(setPageSize(newPageSize))
                }
                page={page}
                pageSize={pageSize}
                rowsPerPageOptions={rowsPerPageOptions}
                rowCount={rowsCount}
                // disabled
                disableColumnFilter
                disableDensitySelector={true}
                disableSelectionOnClick
                // custom
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                    Pagination: Pagination,
                    Toolbar: Toolbar,
                }}
                sx={{ fontSize: '1.4rem', cursor: 'text' }}
            />
        </Styled.DataGridContainer>
    )
}

export default DataGridCustom
