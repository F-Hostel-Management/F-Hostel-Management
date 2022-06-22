import React, { FC, Fragment, useEffect } from 'react'
import DataGridCustom from '../../../components/DataGridCustom'
import { useDialog } from '../../../hooks/useDialog'
import { useGridData } from '../../../hooks/useGridData'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook'
import { setTableInitialState } from '../../../slices/tableSlice'
import { getItem } from '../../../utils/LocalStorageUtils'
import { fetchRoomList } from '../../../slices/roomSlice'
import { Route, Routes } from 'react-router-dom'
import NotFound from '../../NotFound'
import RoomDetails from '../../RoomDetails'
import ToolbarChildren from '../components/Table/ToolbarChildren'
import { createColumns } from '../components/Table/Columns'
import CreateCRoomDialog from '../components/Dialog/CreateRoomDialog'
import { IRoom } from '../../../interface/IRoom'

interface IOwnerRoomsProps {}

const OwnerRooms: FC<IOwnerRoomsProps> = () => {
    const dispatch = useAppDispatch()

    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    const numOfRooms = useAppSelector(({ room }) => room.numOfRooms)
    const loading = useAppSelector(({ room }) => room.isFetchingRooms)

    const rows = useAppSelector(({ room }) => room.roomList)
    const columns = createColumns(useGridData<IRoom>())

    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    useEffect(() => {
        const hostelId = getItem('currentHostelId')
        dispatch(fetchRoomList({ hostelId, pageSize, page }))
    }, [dispatch, page, pageSize])
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <DataGridCustom
                            loading={loading}
                            title="All Rooms"
                            rows={rows}
                            columns={columns}
                            rowsCount={numOfRooms}
                            toolbarChildren={
                                <ToolbarChildren
                                    handleOpenCreate={handleOpenCreate}
                                />
                            }
                        />

                        {openCreate && (
                            <CreateCRoomDialog
                                openDialog={openCreate}
                                handleCloseDialog={handleCloseCreate}
                            />
                        )}
                    </>
                }
            />
            <Route path="/details/:roomId" element={<RoomDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default OwnerRooms
