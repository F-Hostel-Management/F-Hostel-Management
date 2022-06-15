import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import { ERole } from '../../../../utils/enums'
import ConfirmDialog from '../../../../components/DialogCustom/ConfirmDialog'
import { useDialog } from '../../../../hooks/useDialog'
import { Typography } from '@mui/material'
import { Edit, Delete, Description } from '@mui/icons-material'
import UpdateInvoiceDialog from '../UpdateInvoiceDialog'
import InvoiceDetails from '../InvoiceDetails'
import { IInvoice } from '../../../../interface/IInvoice'
import { RestCaller } from '../../../../utils/RestCaller'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import {
    fetchInvoices,
    fetchNumberOfInvoice,
} from '../../../../slices/invoiceSlice'
import { getUserRole } from '../../../../slices/authSlice'
interface IActionButtonsProps {
    rowData: IInvoice
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role = useAppSelector(getUserRole)
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openView, handleOpenView, handleCloseView] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    const dispatch = useAppDispatch()
    const handleDelete = async () => {
        const result = await RestCaller.delete(`Invoices/${rowData.id}`, {
            success: { show: true },
            // loading: true,
        })
        if (!result.isError) {
            dispatch(fetchInvoices({ currentPageSize, currentPage }))
            dispatch(fetchNumberOfInvoice())
        }
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
                <IconButtonCustom
                    textColor="#fff"
                    bgrColor="#E83E8C"
                    sx={{ width: '2.8rem', height: '2.8rem' }}
                    onClick={handleOpenView}
                >
                    <Description sx={{ fontSize: '1.6rem' }} />
                </IconButtonCustom>
                {role !== ERole.TENANT_ROLE && (
                    <>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#495057"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            disabled={rowData.tenantPaid === undefined}
                            onClick={handleOpenUpdate}
                        >
                            <Edit sx={{ fontSize: '1.3rem' }} />
                        </IconButtonCustom>
                        <IconButtonCustom
                            textColor="#fff"
                            bgrColor="#f96332"
                            sx={{ width: '2.8rem', height: '2.8rem' }}
                            disabled={rowData.tenantPaid === undefined}
                            onClick={handleOpenDelete}
                        >
                            <Delete sx={{ fontSize: '1.6rem' }} />
                        </IconButtonCustom>
                    </>
                )}
            </div>

            {openView && (
                <InvoiceDetails
                    openDialog={openView}
                    handleOpenDialog={handleOpenView}
                    handleCloseDialog={handleCloseView}
                    rowData={rowData}
                />
            )}

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
                    handleCloseDialog={handleCloseUpdate}
                    rowData={rowData}
                />
            )}
        </Fragment>
    )
}

export default ActionButtons
