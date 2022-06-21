import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import { ERole } from '../../../../utils/enums'
import { useDialog } from '../../../../hooks/useDialog'
import { Description } from '@mui/icons-material'

import { RestCaller } from '../../../../utils/RestCaller'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import {
    fetchInvoices,
    fetchNumberOfInvoice,
} from '../../../../slices/invoiceSlice'
import { getUserRole } from '../../../../slices/authSlice'
import { ManagerAssignmentDetail } from '../ManagerAssignmentDetail'
import { IManager } from '../../../../interface/IManager'
interface IActionButtonsProps {
    rowData: IManager
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
            </div>

            {openView && (
                <ManagerAssignmentDetail
                    openDialog={openView}
                    handleOpenDialog={handleOpenView}
                    handleCloseDialog={handleCloseView}
                    rowData={rowData}
                />
            )}
        </Fragment>
    )
}

export default ActionButtons
