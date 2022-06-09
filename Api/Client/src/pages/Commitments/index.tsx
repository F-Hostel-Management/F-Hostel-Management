import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useGridData } from '../../hooks/useGridData'

import { ERole } from '../../utils/enums'
import { useDialog } from '../../hooks/useDialog'
import CreateCommitmentDialog from './components/CreateCommitmentDialog'
import ToolbarChildren from './components/ToolbarChildren'

import { createColumns } from './components/Table'
import { getItem } from '../../utils/LocalStorageUtils'
interface ICommitmentsProps {}
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { fetchCommitments } from '../../slices/commitmentSlice'
import {
    setPage,
    setPageSize,
    setTableInitialState,
} from '../../slices/tableSlice'

const Commitments: FC<ICommitmentsProps> = () => {
    const role: ERole = 1
    const dispatch = useAppDispatch()

    const { renderCell, createColumn, renderValueGetter } = useGridData()
    const rows = useAppSelector(({ commitment }) => commitment.commitmentList)
    const columns = createColumns(renderCell, createColumn, renderValueGetter)
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    const numOfCommitment = useAppSelector(
        ({ commitment }) => commitment.numOfCommitment
    )

    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    // Check currentHostelId in localStorage
    useEffect(() => {
        setLoading(true)
        const currentHostelId = getItem('currentHostelId')
        dispatch(fetchCommitments({ currentHostelId, pageSize, page }))
        setLoading(false)
    }, [dispatch, page, pageSize])

    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Commitments"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                setPageSize={(pageSize: number) =>
                    dispatch(setPageSize(pageSize))
                }
                page={page}
                setPage={(page: number) => dispatch(setPage(page))}
                rowsCount={numOfCommitment}
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
