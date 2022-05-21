import { useState, FC, useEffect } from 'react'

import DataGridCustom from '../../components/DataGridCustom'
import Loading from '../../components/Loading'
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { getRows, IData } from './MockData'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
]

interface IDemoProps {}

const Demo: FC<IDemoProps> = (props) => {
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(2)
    const [rows, setRows] = useState<IData[]>([])

    setTimeout(() => setLoading(false), 2000)

    useEffect(() => {
        setRows(getRows(page + 1, pageSize))
    }, [page, pageSize])

    return loading ? (
        <Loading />
    ) : (
        <div>
            <h1>Demo Table</h1>
            <DataGridCustom
                loading={loading}
                rows={rows}
                columns={columns}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                rowsCount={9}
            />
        </div>
    )
}

export default Demo
