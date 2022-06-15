import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IInvoice } from '../../interface/IInvoice'
import { ERole } from '../../utils/enums'
import ActionButtons from './components/ActionButtons'
import DataGridCustom from '../../components/DataGridCustom'
import ToolbarChildren from './components/ToolbarChildren'
import { getData, invoices } from '../../utils/MockData'
import CreateInvoiceDialog from './components/CreateInvoiceDialog'

interface IInvoiceScheduleProps {}

const InvoiceSchedule: FC<IInvoiceScheduleProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<IInvoice[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        createColumn('id', 'Code', 70),
        createColumn('roomName', 'Room Name', 100),
        createColumn('invoiceType', 'Type', 100),
        createColumn('cron', 'Repeat by', 100),
        createColumn('createDate', 'Create Date', 150),
        createColumn('paymentDate', 'Payment Date', 150),
        createColumn('price', 'Price', 100),
        renderCell('actions', 'Actions', 100, ActionButtons),
        createColumn('creator', 'Creator', 120),
    ]

    useEffect(() => {
        setLoading(true)
        const FetchData = async () => {
            const data = getData(page + 1, pageSize, invoices)
            setRows(data)
            setLoading(false)
        }
        FetchData()
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
