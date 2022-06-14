import React, { FC, Fragment, useEffect } from 'react'
import DataGridCustom from '../../../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { useDialog } from '../../../../hooks/useDialog'
import { useGridData } from '../../../../hooks/useGridData'
import { IFacilityManagement } from '../../../../interface/IFacility'
import {
    setPage,
    setPageSize,
    setTableInitialState,
} from '../../../../slices/tableSlice'
import { ERole } from '../../../../utils/enums'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { createColumns } from './Columns'
import CreateRoomFacilitiesDialog from './Dialog/CreateRoomFacilitiesDialog'
import ToolbarChildren from './ToolbarChildren'

interface IFacilitiesTableProps {
    rows?: IFacilityManagement[]
    numOfFacilities?: number
}

const FacilitiesTable: FC<IFacilitiesTableProps> = ({
    rows = [],
    numOfFacilities = 0,
}) => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    const hostelId = getItem('currentHostelId')
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)

    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const { renderCell, createColumn, renderValueGetter } = useGridData()
    const columns = createColumns(renderCell, createColumn, renderValueGetter)
    console.log('Colums: ', columns)

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    useEffect(() => {
        // dispatch(fetchFacility(hostelId))
    }, [page, pageSize, hostelId, dispatch])
    return (
        <Fragment>
            <DataGridCustom
                loading={false}
                title="Room Facilities"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                setPageSize={(pageSize: number) =>
                    dispatch(setPageSize(pageSize))
                }
                page={page}
                setPage={(page: number) => dispatch(setPage(page))}
                rowsCount={numOfFacilities}
                toolbarChildren={
                    role !== ERole.TENANT_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />

            {openCreate && (
                <CreateRoomFacilitiesDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Fragment>
    )
}

export default FacilitiesTable
