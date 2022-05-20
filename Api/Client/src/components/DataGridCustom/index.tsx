import React, { FC, useState } from 'react'

import { DataGrid } from '@mui/x-data-grid'

import CustomNoRowsOverlay from './Custom/CustomNoRowsOverlay'
import CustomPagination from './Custom/CustomPagination'

interface IDataGridCustomProps {
    loading: boolean
    rows: Array<any>
    columns: Array<any>
    pageSize: number
    setPageSize: any
    page: number
    setPage: any
    rowsCount: number
}

const DataGridCustom: FC<IDataGridCustomProps> = ({
    loading = false,
    rows = [],
    columns = [],
    pageSize = 5,
    setPageSize = () => {},
    page = 0,
    setPage = () => {},
    rowsCount = 0,
}) => {
    return (
        <div style={{ height: 400, width: '80%' }}>
            <DataGrid
                loading={loading}
                rows={rows}
                columns={columns}
                aria-label="Table demo"
                pagination
                paginationMode="server"
                page={page}
                pageSize={pageSize}
                rowsPerPageOptions={[2, 4, 6, 8]}
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
                    Pagination: CustomPagination
                }}
            />
        </div>
    )
}

export default DataGridCustom
