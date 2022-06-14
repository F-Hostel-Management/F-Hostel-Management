import React, { FC, Fragment, useEffect } from 'react'
import DataGridCustom from '../../../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { useDialog } from '../../../../hooks/useDialog'
import { useGridData } from '../../../../hooks/useGridData'
import {
    setPage,
    setPageSize,
    setTableInitialState,
} from '../../../../slices/tableSlice'
import { ERole } from '../../../../utils/enums'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { createColumns } from './Columns'

interface IFacilitiesTableProps {}

const FacilitiesTable: FC<IFacilitiesTableProps> = (props) => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    const { renderCell, createColumn } = useGridData()
    const hostelId = getItem('currentHostelId')
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)

    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const rows = useAppSelector((e) => e.facility.facilityList)
    const columns = createColumns(renderCell, createColumn)
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
                loading={true}
                title="Room Facilities"
                rows={[]}
                columns={columns}
                pageSize={pageSize}
                setPageSize={(pageSize: number) =>
                    dispatch(setPageSize(pageSize))
                }
                page={page}
                setPage={(page: number) => dispatch(setPage(page))}
                rowsCount={5}
                toolbarChildren={
                    role != ERole.TENANT_ROLE ? (
                        <div></div>
                    ) : // <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    null
                }
            />

            {/* {openCreate && (
                <CreateFacilityDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                    // reloadData={() =>)}
                />
            )} */}
        </Fragment>
    )
}

export default FacilitiesTable
