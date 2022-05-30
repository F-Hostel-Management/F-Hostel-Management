import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'
import { commitments, getData } from '../../utils/MockData'
import { Button } from '@mui/material'
import ActionButtons from './components/ActionButtons'
import CommitmentStatus from './components/CommitmentStatus'
import { ICommitment } from '../../interface/commitment'
import AddCircleIcon from '@mui/icons-material/AddCircle'
interface ICommitmentsProps {}

const Commitments: FC<ICommitmentsProps> = () => {
    const { renderCell, createColumn } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<ICommitment[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const ToolbarChildren: FC<{}> = () => (
        <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            size="small"
            sx={{ margin: '0px 8px' }}
        >
            Create
        </Button>
    )

    const columns: GridColDef[] = [
        createColumn('id', 'Code', 100),
        createColumn('createdDate', 'Created Date', 200),
        createColumn('startedDate', 'Started Date', 200),
        createColumn('endDate', 'End Date', 200),
        renderCell('status', 'Status', 180, CommitmentStatus),
        renderCell('actions', 'Actions', 180, ActionButtons),
    ]

    useEffect(() => {
        setLoading(true)
        const FetchData = async () => {
            const data = getData(page + 1, pageSize, commitments)
            setRows(data)
            setLoading(false)
        }
        FetchData()
    }, [page, pageSize])

    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Commitments"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                setPageSize={setPageSize}
                page={page}
                setPage={setPage}
                rowsCount={27}
                toolbarChildren={<ToolbarChildren />}
            />
        </Fragment>
    )
}

export default Commitments
