import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'
import { commitments, getData } from '../../utils/MockData'
import ActionButtons from './components/ActionButtons'
import CommitmentStatus from './components/CommitmentStatus'
import { ICommitment } from '../../interface/commitment'

import { ERole } from '../../utils/enums'
import { useDialog } from '../../hooks/useDialog'
import CreateCommitmentDialog from './components/CreateCommitmentDialog'
import ToolbarChildren from './components/ToolbarChildren'
interface ICommitmentsProps {}

const Commitments: FC<ICommitmentsProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<ICommitment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

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
                toolbarChildren={
                    role != ERole.TENANT_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />

            {/* Dialog */}
            {openCreate && (
                <CreateCommitmentDialog
                    openDialog={openCreate}
                    handleOpenDialog={handleOpenCreate}
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Fragment>
    )
}

export default Commitments
