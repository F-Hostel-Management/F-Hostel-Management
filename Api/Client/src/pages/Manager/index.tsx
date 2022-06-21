import { GridColDef } from '@mui/x-data-grid'
import React from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IManager } from '../../interface/IManager'
import { getUserRole } from '../../slices/authSlice'
import { getGridData } from '../../slices/managerSlice'
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

    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    const { renderCell, createColumn, renderValueGetter } =
        useGridData<IManager>()
    const columns: GridColDef[] = [
        createColumn('id', 'Id', 10),
        createColumn('avatar', 'Avatar', 250),
        createColumn('name', 'Name', 250),
        createColumn('phone', 'Phone', 120),
        renderCell('actions', 'Actions', 200, ActionButtons),
    ]
    return (
        <ManagerPageContainer elevation={3}>
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
