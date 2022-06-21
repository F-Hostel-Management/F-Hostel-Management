import { GridColDef } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IManagement } from '../../interface/IManager'
import { getUserRole } from '../../slices/authSlice'
import {
    fetchHostelAssignmentList,
    getGridData,
} from '../../slices/managerSlice'
import { ERole } from '../../utils/enums'
import ActionButtons from './components/ActionButtons'
import { AssignmentDialog } from './components/AssignmentDialog'
import ToolbarChildren from './components/ToolBarChildren'
import { ManagerPageContainer } from './style'

type Props = {
    name: string
}

export const ManagerPage = (props: Props) => {
    // console.log([props.name])
    const role = useAppSelector(getUserRole)
    const gridData = useAppSelector(getGridData)
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    useEffect(() => {
        dispatch(fetchHostelAssignmentList({ currentPage, currentPageSize }))
    }, [])
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const { renderCell, createColumn, renderValueGetter } =
        useGridData<IManagement>()
    const columns: GridColDef[] = [
        createColumn('id', 'Id', 10),
        renderValueGetter(
            'avatar',
            'Avatar',
            250,
            (params) => params.manager.avatar
        ),
        renderValueGetter('name', 'Name', 250, (params) => params.manager.name),
        renderValueGetter(
            'phone',
            'Phone',
            250,
            (params) => params.manager.phone
        ),
        renderCell('actions', 'Actions', 200, ActionButtons),
    ]
    return (
        <ManagerPageContainer>
            <DataGridCustom
                loading={gridData.loading}
                title="All Managers"
                rows={gridData.rows}
                columns={columns}
                rowsCount={gridData.totalRows}
                toolbarChildren={
                    role == ERole.OWNER_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />
            {openCreate && (
                <AssignmentDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </ManagerPageContainer>
    )
}
