import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import { ERole } from '../../../../utils/enums'
import ConfirmDialog from '../../../../components/DialogCustom/ConfirmDialog'
import { useDialog } from '../../../../hooks/useDialog'
import { Typography } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import UpdateInvoiceDialog from '../UpdateInvoiceDialog'
import { IInvoiceSchedule } from '../../../../interface/IInvoice'
interface IActionButtonsProps {
    rowData: IInvoiceSchedule
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role: ERole = 1
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()

    const handleDelete = async () => {
        handleCloseDelete()
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
                {role !== ERole.TENANT_ROLE && (
                    <>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#495057"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            onClick={handleOpenUpdate}
                        >
                            <Edit sx={{ fontSize: '1.3rem' }} />
                        </IconButtonCustom>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#f96332"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            onClick={handleOpenDelete}
                        >
                            <Delete sx={{ fontSize: '1.6rem' }} />
                        </IconButtonCustom>
                    </>
                )}
            </div>

            {openDelete && (
                <ConfirmDialog
                    title="Delete Invoice"
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
                            Do yo really want to delete this invoice. This
                            process can not be undone.
                        </Typography>
                    </div>
                </ConfirmDialog>
            )}

            {openUpdate && (
                <UpdateInvoiceDialog
                    openDialog={openUpdate}
                    handleOpenDialog={handleOpenUpdate}
                    handleCloseDialog={handleCloseUpdate}
                    rowData={rowData}
                />
            )}
        </Fragment>
    )
}

export default ActionButtons
