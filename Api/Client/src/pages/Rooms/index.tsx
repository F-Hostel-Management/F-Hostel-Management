import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IRoom } from '../../interface/IRoom'
import { ERole } from '../../utils/enums'
import RoomStatus from './components/RoomStatus'
import ToolbarChildren from './components/ToolbarChildren'
import ActionButtons from './components/ActionButtons'
import CreateCRoomDialog from './components/CreateRoomDialog'
interface IRoomsProps {}

const Rooms: FC<IRoomsProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<IRoom[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        createColumn('id', 'Code', 50),
        createColumn('roomNumber', 'Room Name', 120),
        createColumn('type', 'Type', 100),
        createColumn('numberOfBathRoom', 'BathRoom', 100),
        createColumn('numberOfToilet', 'Toilet', 100),
        createColumn('area', 'Area', 100),
        createColumn('price', 'Price', 120),
        renderCell('status', 'Status', 130, RoomStatus),
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
                title="All Rooms"
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
                <CreateCRoomDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Fragment>
    )
}

export default Rooms
