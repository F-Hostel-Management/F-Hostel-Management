import React, { FC } from 'react'

import CustomNoRowsOverlay from './Custom/CustomNoRowsOverlay'
import CustomPagination from './Custom/CustomPagination'
import CustomToolbar from './Custom/CustomToolbar'
import * as Styled from './styles'

interface IDataGridCustomProps {
    loading: boolean
    title: string
    rows: Array<any>
    columns: Array<any>
    pageSize: number
    setPageSize: any
    page: number
    setPage: any
    rowsCount: number
    rowsPerPageOptions?: number[]
    toolbarChildren?: any
}

const DataGridCustom: FC<IDataGridCustomProps> = ({
    loading,
    title,
    rows,
    columns,
    pageSize,
    setPageSize,
    page,
    setPage,
    rowsCount,
    rowsPerPageOptions = [5, 10, 25, 100],
    toolbarChildren,
}) => {
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

    return (
        <Styled.DataGridContainer
            width="100%"
            color="#F06D06"
            elevation={3}
            style={{ backgroundColor: '#FFFFFF' }}
        >
            <Styled.DataGrid
                loading={loading}
                rows={rows}
                columns={columns}
                aria-label="Table demo"
                pagination
                paginationMode="server"
                page={page}
                pageSize={pageSize}
                rowsPerPageOptions={rowsPerPageOptions}
                rowCount={rowsCount}
                disableColumnFilter
                disableDensitySelector={true}
                // onCellClick={(params, event, details) =>
                //     console.log(params.row)
                // }
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                components={{
                    NoRowsOverlay: CustomNoRowsOverlay,
                    Pagination: Pagination,
                    Toolbar: Toolbar,
                }}
                disableSelectionOnClick
                sx={{ fontSize: '1.4rem', cursor: 'text' }}
            />
        </Styled.DataGridContainer>
    )
}

export default DataGridCustom
