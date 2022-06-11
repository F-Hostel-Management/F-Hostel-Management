import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import { Edit, Delete } from '@mui/icons-material'
import { ERole } from '../../../../utils/enums'
import ConfirmDialog from '../../../../components/DialogCustom/ConfirmDialog'
import { useDialog } from '../../../../hooks/useDialog'
import { Typography } from '@mui/material'
import DialogCustom from '../../../../components/DialogCustom'
import UpdateFacilityDialog from '../UpdateFacilityDialog'
import { IFacility } from '../../../../interface/IFacility'
import { RestCaller } from '../../../../utils/RestCaller'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import { fetchFacility } from '../../../../slices/facilitySlice'
import { getItem } from '../../../../utils/LocalStorageUtils'
interface IActionButtonsProps {
    rowData: any
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role: ERole = 1
    const hostelId = getItem('currentHostelId')
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openView, handleOpenView, handleCloseView] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
    const dispatch = useAppDispatch()
    const handleDelete = async () => {
        const rowValue = rowData as IFacility
        await RestCaller.delete(`Facility?facilityId=${rowValue.id}`)
        dispatch(fetchFacility(hostelId))
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

            {openUpdate && (
                <UpdateFacilityDialog
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
