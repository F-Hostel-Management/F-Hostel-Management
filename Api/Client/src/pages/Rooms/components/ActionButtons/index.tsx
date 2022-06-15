import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ERoomStatus as Status } from '../../../../utils/enums'
import { ERole } from '../../../../utils/enums'
import ConfirmDialog from '../../../../components/DialogCustom/ConfirmDialog'
import { useDialog } from '../../../../hooks/useDialog'
import { Typography } from '@mui/material'
import DialogCustom from '../../../../components/DialogCustom'
interface IActionButtonsProps {
    rowData: any
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role: ERole = 1
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openView, handleOpenView, handleCloseView] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()

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
                            <EditIcon sx={{ fontSize: '1.3rem' }} />
                        </IconButtonCustom>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#f96332"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            disabled={rowData.status === Status.Rented}
                            onClick={handleOpenDelete}
                        >
                            <DeleteIcon sx={{ fontSize: '1.6rem' }} />
                        </IconButtonCustom>
                    </>
                )}
            </div>

            {openView && (
                <DialogCustom
                    title="Commitment Details"
                    openDialog={openView}
                    handleCloseDialog={handleCloseView}
                    maxWidth="xl"
                >
                    <div
                        style={{
                            minHeight: '100px',
                            width: '80%',
                            margin: 'auto',
                        }}
                    >
                        {/* <CommitmentDetails /> */}
                    </div>
                </DialogCustom>
            )}

            {openDelete && (
                <ConfirmDialog
                    title="Delete Commitment"
                    openDialog={openDelete}
                    handleOpenDialog={handleOpenDelete}
                    handleCloseDialog={handleCloseDelete}
                >
                    <div style={{ minHeight: '100px' }}>
                        <Typography variant="h3" mb={1}>
                            Are you sure ?
                        </Typography>
                        <Typography variant="body1">
                            Do yo really want to delete this commitment. This
                            process can not be undone.
                        </Typography>
                    </div>
                </ConfirmDialog>
            )}

            {/* {openUpdate && (
                <UpdateCommitmentDialog
                    openDialog={openUpdate}
                    handleOpenDialog={handleOpenUpdate}
                    handleCloseDialog={handleCloseUpdate}
                />
            )} */}
        </Fragment>
    )
}

export default ActionButtons
