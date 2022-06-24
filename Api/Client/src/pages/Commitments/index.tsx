import React, { FC, Fragment, useEffect } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'

import { ERole } from '../../utils/enums'
import { useDialog } from '../../hooks/useDialog'
import CreateCommitmentDialog from './components/CreateCommitmentDialog'
import ToolbarChildren from './components/ToolbarChildren'

import { createColumns } from './components/Columns'
import { getItem } from '../../utils/LocalStorageUtils'
interface ICommitmentsProps {}
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { fetchCommitments } from '../../slices/commitmentSlice'
import { setTableInitialState } from '../../slices/tableSlice'
import { IRoom } from '../../interface/IRoom'

const Commitments: FC<ICommitmentsProps> = () => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    const dispatch = useAppDispatch()

    const { renderCell, createColumn, renderValueGetter } = useGridData<IRoom>()
    const rows = useAppSelector(({ commitment }) => commitment.commitmentList)
    const columns = createColumns({
        renderCell,
        createColumn,
        renderValueGetter,
    })
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    const numOfCommitment = useAppSelector(
        ({ commitment }) => commitment.numOfCommitment
    )
    const loading = useAppSelector(
        ({ commitment }) => commitment.isFetchingCommitments
    )

    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    // Check currentHostelId in localStorage
    useEffect(() => {
        const currentHostelId = getItem('currentHostelId')
        dispatch(fetchCommitments({ currentHostelId, pageSize, page }))
    }, [dispatch, page, pageSize])

    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Commitments"
                rows={rows}
                columns={columns}
                rowsCount={numOfCommitment}
                toolbarChildren={
                    role !== ERole.TENANT_ROLE ? (
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
