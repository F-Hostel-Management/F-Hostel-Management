import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IInvoiceSchedule } from '../../interface/IInvoice'
import { ERole } from '../../utils/enums'
import ActionButtons from './components/ActionButtons'
import DataGridCustom from '../../components/DataGridCustom'
import ToolbarChildren from './components/ToolbarChildren'
import CreateInvoiceDialog from './components/CreateInvoiceDialog'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { getUserRole } from '../../slices/authSlice'
import {
    setPage,
    setPageSize,
    setTableInitialState,
} from '../../slices/tableSlice'
import {
    fetchInvoiceSchedules,
    fetchNumberOfInvoiceSchedule,
} from '../../slices/invoiceScheduleSlice'
import { getItem } from '../../utils/LocalStorageUtils'
import { DaysOfTheWeek } from '../../constants/Date'

interface IInvoiceScheduleProps {}

const InvoiceSchedule: FC<IInvoiceScheduleProps> = () => {
    const dispatch = useAppDispatch()

    const role = useAppSelector(getUserRole)
    const { renderCell, createColumn, renderValueGetter } = useGridData()

    const numOfInvoiceSchedule = useAppSelector(
        ({ invoiceSchedule }) => invoiceSchedule.numOfInvoiceSchedule
    )
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    const rows = useAppSelector(
        ({ invoiceSchedule }) => invoiceSchedule.invoiceScheduleList
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        renderValueGetter(
            'roomName',
            'Room',
            150,
            (params: IInvoiceSchedule) => params.room?.roomName ?? ''
        ),
        createColumn('content', 'Content', 150),
        createColumn('invoiceType', 'Type', 100),
        createColumn('cron', 'Repeat by', 100),
        renderValueGetter(
            'createDate',
            'Create Date',
            100,
            (params: IInvoiceSchedule): string => {
                if (params?.cron === 'Month')
                    return String(params?.createDate) ?? '1'
                else if (params?.cron === 'Week')
                    return DaysOfTheWeek[params?.createDate ?? 0] ?? '1'

                return '1'
            }
        ),
        createColumn('paymentDate', 'Payment Date', 150),
        createColumn('price', 'Price', 100),
        renderValueGetter(
            'creator',
            'Creator',
            150,
            (params: IInvoiceSchedule) => params.manager?.name ?? ''
        ),
        renderCell('actions', 'Actions', 100, ActionButtons),
    ]

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    const currentHostelId = getItem('currentHostelId')
    const getInvoiceSchedulesUI = async () => {
        setLoading(true)
        dispatch(fetchInvoiceSchedules({ currentPageSize, currentPage }))
        dispatch(fetchNumberOfInvoiceSchedule())
        setLoading(false)
    }

    useEffect(() => {
        getInvoiceSchedulesUI()
    }, [dispatch, currentPageSize, currentPage, currentHostelId])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Invoice Schedule"
                rows={rows}
                columns={columns}
                pageSize={currentPageSize}
                setPageSize={(pageSize: number) =>
                    dispatch(setPageSize(pageSize))
                }
                page={currentPage}
                setPage={(page: number) => dispatch(setPage(page))}
                rowsCount={numOfInvoiceSchedule}
                toolbarChildren={
                    role != ERole.TENANT_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />

            {openCreate && (
                <CreateInvoiceDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Fragment>
    )
}
export default InvoiceSchedule
