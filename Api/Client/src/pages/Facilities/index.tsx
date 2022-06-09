import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IFacility } from '../../interface/IFacility'
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

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<IFacility[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        // createColumn('id', 'Code', 70),
        createColumn('name', 'Facility Name', 400),
        createColumn('type', 'Category', 200),
        createColumn('quantity', 'Quantity', 200),
        createColumn('price', 'Price', 150),
        renderCell('actions', 'Actions', 130, ActionButtons),
    ]
    const FetchData = useCallback(async () => {
        const result = await getListFacility(hostelId)
        setLoading(false)
        setRows(result)
    }, [])
    useEffect(() => {
        setLoading(true)
        FetchData()
    }, [page, pageSize, hostelId, FetchData])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Facilities"
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

            {openCreate && (
                <CreateFacilityDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                    reloadData={FetchData}
                />
            )}
        </Fragment>
    )
}

export default Facilities
