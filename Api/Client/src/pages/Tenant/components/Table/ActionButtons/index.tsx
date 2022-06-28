import { Tooltip, Typography } from '@mui/material'
import React, { FC, Fragment } from 'react'

import { Delete as DeleteIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHook'
import { useDialog } from '../../../../../hooks/useDialog'
import { ERole } from '../../../../../utils/enums'
import IconButtonCustom from '../../../../../components/Button/IconButtonCustom'
import ConfirmDialog from '../../../../../components/DialogCustom/ConfirmDialog'
import { removeTenantFromRoom } from '../../../../../services/TenantService'
import { IRoomTenant } from '../../../../../interface/IRoomTenant'
import { fetchTenantList } from '../../../../../slices/tenantSlide'
import { getItem } from '../../../../../utils/LocalStorageUtils'

interface IActionButtonsProps {
    rowData: IRoomTenant
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)

    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)

    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()

    const handleKickTenant = async () => {
        ;(async () => {
            const response = await removeTenantFromRoom(rowData.id)
            if (!response.isError) {
                const hostelId = getItem('currentHostelId')
                dispatch(fetchTenantList({ hostelId, pageSize, page }))
                handleCloseDelete()
            }
        })()
    }

    return (
        <Fragment>
            <div
                style={{
                    width: role !== ERole.TENANT_ROLE ? '11rem' : '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                <IconButtonCustom
                    textColor="#fff"
                    bgrColor="#f96332"
                    sx={{ width: '2.8rem', height: '2.8rem' }}
                    onClick={handleOpenDelete}
                >
                    <Tooltip title="Remove from room" placement="top">
                        <DeleteIcon sx={{ fontSize: '1.6rem' }} />
                    </Tooltip>
                </IconButtonCustom>
            </div>

            {openDelete && (
                <ConfirmDialog
                    title="Kick Tenant"
                    openDialog={openDelete}
                    handleOpenDialog={handleOpenDelete}
                    handleCloseDialog={handleCloseDelete}
                    handleConfirm={handleKickTenant}
                >
                    <div style={{ minHeight: '100px' }}>
                        <Typography variant="h3" mb={1}>
                            Are you sure ?
                        </Typography>
                        <Typography variant="body1">
                            Do yo really want to kick {rowData.tenant.name} from{' '}
                            {rowData.room.roomName}. This process can not be
                            undone.
                        </Typography>
                    </div>
                </ConfirmDialog>
            )}
        </Fragment>
    )
}

export default ActionButtons
