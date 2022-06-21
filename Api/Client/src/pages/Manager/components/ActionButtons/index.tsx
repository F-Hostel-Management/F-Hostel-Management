import React, { FC, Fragment } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import { ERole } from '../../../../utils/enums'
import { useDialog } from '../../../../hooks/useDialog'
import { Description } from '@mui/icons-material'

import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'

import { getUserRole } from '../../../../slices/authSlice'
import { IManagement } from '../../../../interface/IManager'
import { ManagerDetail } from '../ManagerDetail'
interface IActionButtonsProps {
    rowData: IManagement
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role = useAppSelector(getUserRole)
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openView, handleOpenView, handleCloseView] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    const dispatch = useAppDispatch()
    const handleDelete = async () => {}

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
                <ManagerDetail
                    openDialog={openView}
                    handleOpenDialog={handleOpenView}
                    handleCloseDialog={handleCloseView}
                    rowData={rowData.manager}
                />
            )}
        </Fragment>
    )
}

export default ActionButtons
