import React, { FC, Fragment, useEffect } from 'react'
import DataGridCustom from '../../../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { useDialog } from '../../../../hooks/useDialog'
import { useGridData } from '../../../../hooks/useGridData'
import { IFacilityManagement } from '../../../../interface/IFacility'
import { setTableInitialState } from '../../../../slices/tableSlice'
import { ERole } from '../../../../utils/enums'
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
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    const isFetchingDetails = useAppSelector(
        ({ roomDetails }) => roomDetails.isFetchingDetails
    )

    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const columns = createColumns(useGridData<IFacilityManagement>())

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    return (
        <>
            <DataGridCustom
                loading={isFetchingDetails}
                title="Room Facilities"
                rows={rows}
                columns={columns}
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
        </>
    )
}

export default FacilitiesTable
