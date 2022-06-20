import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IInvoiceSchedule } from '../../interface/IInvoice'
import { ERole } from '../../utils/enums'
import ActionButtons from './components/ActionButtons'
import DataGridCustom from '../../components/DataGridCustom'
import ToolbarChildren from './components/ToolbarChildren'
import { getData, invoices } from '../../utils/MockData'
import CreateInvoiceDialog from './components/CreateInvoiceDialog'

interface IInvoiceScheduleProps {}

const InvoiceSchedule: FC<IInvoiceScheduleProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn, renderValueGetter } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<IInvoiceSchedule[]>([
        {
            id: 'abc',
            content: 'Tien nha',
            invoiceType: 'House',
            cron: 'Month',
            createDate: 1,
            paymentDate: 3,
            price: 1000000,
            room: {
                id: 'b95fb77c-6144-4a0f-abab-08da51fe692b',
                roomName: 'Krajcik, Ziemann and Marquardt',
            },
            manager: {
                name: 'Nhat Huy',
            },
        },
    ])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        renderValueGetter(
            'roomName',
            'Room',
            150,
            (params: IInvoiceSchedule) => params.room?.roomName ?? ''
        ),
        createColumn('invoiceType', 'Type', 100),
        createColumn('cron', 'Repeat by', 100),
        createColumn('createDate', 'Create Date', 100),
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
        setLoading(true)
        const FetchData = async () => {
            const data = getData(page + 1, pageSize, invoices)
            setRows(data)
            setLoading(false)
        }
        // FetchData()
    }, [page, pageSize])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Invoice Schedule"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                setPageSize={setPageSize}
                page={page}
                setPage={setPage}
                rowsCount={27}
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
                    // reloadData={() =>)}
                />
            )}
        </Fragment>
    )
}
export default InvoiceSchedule
