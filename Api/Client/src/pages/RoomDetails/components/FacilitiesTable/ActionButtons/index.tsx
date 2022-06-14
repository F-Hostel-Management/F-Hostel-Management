import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../../components/Button/IconButtonCustom'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHook'
import { useDialog } from '../../../../../hooks/useDialog'
import { ERole } from '../../../../../utils/enums'
import { getItem } from '../../../../../utils/LocalStorageUtils'
import { Edit as EditICon, Delete as DeleteICon } from '@mui/icons-material'
import ConfirmDialog from '../../../../../components/DialogCustom/ConfirmDialog'
import { Typography } from '@mui/material'

interface IActionButtonsProps {
    rowData: any
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    const hostelId = getItem('currentHostelId')
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openView, handleOpenView, handleCloseView] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
    const dispatch = useAppDispatch()
    const handleDelete = async () => {}
    return (
        <>
            <div
                style={{
                    width: role !== ERole.TENANT_ROLE ? '11rem' : '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                {role !== ERole.TENANT_ROLE && (
                    <>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#495057"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            onClick={handleOpenUpdate}
                        >
                            <EditICon sx={{ fontSize: '1.3rem' }} />
                        </IconButtonCustom>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#f96332"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            onClick={handleOpenDelete}
                        >
                            <DeleteICon sx={{ fontSize: '1.6rem' }} />
                        </IconButtonCustom>
                    </>
                )}
            </div>

            {openDelete && (
                <ConfirmDialog
                    title="Delete Commitment"
                    openDialog={openDelete}
                    handleOpenDialog={handleOpenDelete}
                    handleCloseDialog={handleCloseDelete}
                    maxWidth="sm"
                    handleConfirm={handleDelete}
                >
                    <div style={{ minHeight: '100px' }}>
                        <Typography
                            variant="h6"
                            mb={1}
                            sx={{ fontWeight: '600' }}
                        >
                            Are you sure ?
                        </Typography>
                        <Typography variant="body2">
                            Do yo really want to delete this facility. This
                            process can not be undone.
                        </Typography>
                    </div>
                </ConfirmDialog>
            )}
        </>
    )
}

export default ActionButtons
