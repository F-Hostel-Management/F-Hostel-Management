import React, { FC } from 'react'

import CustomNoRowsOverlay from './Custom/CustomNoRowsOverlay'
import CustomPagination from './Custom/CustomPagination'
import CustomToolbar from './Custom/CustomToolbar'
import * as Styled from './styles'

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
        <Styled.DataGridContainer
            width="100%"
            color="#F06D06"
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
                    Pagination: CustomPagination,
                    Toolbar: CustomToolbar,
                }}
            />
        </Styled.DataGridContainer>
    )
}

export default DataGridCustom
