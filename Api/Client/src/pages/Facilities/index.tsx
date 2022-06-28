import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IFacility } from '../../interface/IFacility'
import { fetchFacility } from '../../slices/facilitySlice'
import { ERole } from '../../utils/enums'
import { getItem } from '../../utils/LocalStorageUtils'
import { ODataCaller } from '../../utils/ODataCaller'
import ActionButtons from './components/ActionButtons'
import CreateFacilityDialog from './components/CreateFacilityDialog'
import ToolbarChildren from './components/ToolbarChildren'
const { createBuilder, get } = ODataCaller
interface IFacilitiesProps {}
const getListFacility = async (hostelId: string) => {
    const builder = createBuilder<IFacility>()
        .select('id', 'name', 'type', 'quantity', 'price')
        .filter((e) => e.hostelId.equals(hostelId))
    const result = await get('Facility', builder)
    return result
}
const Facilities: FC<IFacilitiesProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()
    const hostelId = getItem('currentHostelId')
    const dispatch = useAppDispatch()
    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    // const [rows, setRows] = useState<IFacility[]>([])
    // const [loading, setLoading] = useState<boolean>(true)
    const loading = useAppSelector((state) => state.facility.isFetchingList)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const rows = useAppSelector((e) => e.facility.facilityList)
    const columns: GridColDef[] = [
        // createColumn('id', 'Code', 70),
        createColumn('name', 'Facility Name', 400),
        createColumn('type', 'Category', 200),
        createColumn('quantity', 'Quantity', 200),
        createColumn('price', 'Price', 150),
        renderCell('actions', 'Actions', 130, ActionButtons),
    ]

    useEffect(() => {
        dispatch(fetchFacility(hostelId))
    }, [page, pageSize, hostelId, dispatch])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Facilities"
                iconName="facility"
                rows={rows}
                columns={columns}
                rowsCount={27}
                toolbarChildren={
                    role != ERole.TENANT_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />

            {openCreate && (
                <CreateFacilityDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                    // reloadData={() =>)}
                />
            )}
        </Fragment>
    )
}

export default Facilities
