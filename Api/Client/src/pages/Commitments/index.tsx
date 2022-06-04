import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'
import ActionButtons from './components/ActionButtons'
import CommitmentStatus from './components/CommitmentStatus'
import { ICommitment } from '../../interface/ICommitment'

import { ERole } from '../../utils/enums'
import { useDialog } from '../../hooks/useDialog'
import CreateCommitmentDialog from './components/CreateCommitmentDialog'
import ToolbarChildren from './components/ToolbarChildren'
import { getAllCommitmentOfHostel } from '../../services/commitments'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentHostel } from '../../slices/hostelSlice'
import { getItem } from '../../utils/LocalStorageUtils'
import { useNavigate } from 'react-router-dom'
import { setCurrentHostel } from '../../slices/hostelSlice'
import { getHostelById } from '../../services/hostels'
interface ICommitmentsProps {}

const Commitments: FC<ICommitmentsProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()
    const currentHostel = useSelector(getCurrentHostel)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<ICommitment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        createColumn('commitmentCode', 'Code', 100),
        createColumn('manager', 'Manager', 200),
        createColumn('createdDate', 'Created Date', 200),
        createColumn('startDate', 'Started Date', 200),
        createColumn('endDate', 'End Date', 200),
        renderCell('status', 'Status', 180, CommitmentStatus),
        renderCell('actions', 'Actions', 180, ActionButtons),
    ]

    const FetchData = async () => {
        const data = await getAllCommitmentOfHostel(
            getItem('currentHostelId'),
            pageSize,
            page
        )
        console.log('Data: ', data, currentHostel.id)
        setRows(data)
        setLoading(false)
    }

    // Check currentHostelId in localStorage
    useEffect(() => {
        const hostelId = getItem('currentHostelId')

        if (!hostelId?.length) {
            navigate('/home')
        } else {
            FetchData()
            if (!Object.keys(currentHostel).length) {
                ;(async () => {
                    const hostelInfo = await getHostelById(hostelId)
                    dispatch(setCurrentHostel(hostelInfo))
                })()
            }
        }
    }, [pageSize, page])

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
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Fragment>
    )
}

export default Commitments
