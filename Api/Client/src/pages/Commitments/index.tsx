import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'
import { ICommitment } from '../../interface/ICommitment'

import { ERole } from '../../utils/enums'
import { useDialog } from '../../hooks/useDialog'
import CreateCommitmentDialog from './components/CreateCommitmentDialog'
import ToolbarChildren from './components/ToolbarChildren'
import { getCurrentHostel, setCurrentHostel } from '../../slices/hostelSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getItem } from '../../utils/LocalStorageUtils'
import {
    getAllCommitmentOfHostel,
    getNumberCommitmentOfHostel,
} from '../../services/commitments'
import { getHostelById } from '../../services/hostels'
import { createColumns } from './components/Table'
interface ICommitmentsProps {}

const Commitments: FC<ICommitmentsProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn, renderValueGetter } = useGridData()
    const currentHostel = useSelector(getCurrentHostel)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const columns = createColumns(renderCell, createColumn, renderValueGetter)

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<ICommitment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const [numberOfCommitment, setNumberOfCommitment] = useState<number>(0)

    const FetchData = async () => {
        const hostelId = getItem('currentHostelId')
        const commitments = await getAllCommitmentOfHostel(
            hostelId,
            pageSize,
            page
        )
        const numberCommitment = await getNumberCommitmentOfHostel(hostelId)
        setRows(commitments)
        setNumberOfCommitment(numberCommitment)
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
