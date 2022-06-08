import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IFacility } from '../../interface/IFacility'
import { ERole } from '../../utils/enums'
import ActionButtons from './components/ActionButtons'
import CreateFacilityDialog from './components/CreateFacilityDialog'
import ToolbarChildren from './components/ToolbarChildren'

interface IFacilitiesProps {}

const Facilities: FC<IFacilitiesProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<IFacility[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const handleSubmit = () => {}

    const columns: GridColDef[] = [
        createColumn('id', 'Code', 70),
        createColumn('facilityName', 'Facility Name', 400),
        createColumn('category', 'Category', 200),
        createColumn('price', 'Price', 150),
        renderCell('actions', 'Actions', 130, ActionButtons),
    ]

    useEffect(() => {
        setLoading(true)
        const FetchData = async () => {}
        FetchData()
    }, [page, pageSize])
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
                    handleSubmit={handleSubmit}
                />
            )}
        </Fragment>
    )
}

export default Facilities
