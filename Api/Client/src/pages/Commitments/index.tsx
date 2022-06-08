import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'
import { ICommitment } from '../../interface/ICommitment'

import { ERole } from '../../utils/enums'
import { useDialog } from '../../hooks/useDialog'
import CreateCommitmentDialog from './components/CreateCommitmentDialog'
import ToolbarChildren from './components/ToolbarChildren'
import { getCurrentHostel } from '../../slices/hostelSlice'
import { useSelector } from 'react-redux'
import {
    getAllCommitmentOfHostel,
    getNumberCommitmentOfHostel,
} from '../../services/CommitmentService'
import { createColumns } from './components/Table'
import { getItem } from '../../utils/LocalStorageUtils'
interface ICommitmentsProps {}

const Commitments: FC<ICommitmentsProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn, renderValueGetter } = useGridData()
    const currentHostel = useSelector(getCurrentHostel)
    const columns = createColumns(renderCell, createColumn, renderValueGetter)

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<ICommitment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const [numberOfCommitment, setNumberOfCommitment] = useState<number>(0)

    // Check currentHostelId in localStorage
    useEffect(() => {
        const currentHostelId = getItem('currentHostelId')
        const FetchData = async () => {
            const commitments = await getAllCommitmentOfHostel(
                currentHostelId,
                pageSize,
                page
            )
            const numberCommitment = await getNumberCommitmentOfHostel(
                currentHostelId
            )
            setRows(commitments)
            setNumberOfCommitment(numberCommitment)
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
                rowsCount={numberOfCommitment}
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
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Fragment>
    )
}

export default Commitments
